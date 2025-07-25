"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";

import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Pages, Routes } from "@/constants/enums";
import { toast } from "@/hooks/use-toast";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";

function Form({ translations }: { translations: Translations }) {
  const router = useRouter();
  const { locale } = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { getFormFields } = useFormFields({
    slug: Pages.LOGIN,
    translations,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        const { validationError, responseError } = JSON.parse(res?.error);
        setError(validationError || {});
        if (responseError) {
          toast({
            title: responseError,
            className: "text-destructive",
          });
        }
      }

      if (res?.ok) {
        toast({
          title: translations.messages.loginSuccessful,
          className: "text-green-400",
        });

        // احضر الـ session بعد تسجيل الدخول
        const session = await getSession();
        const role = session?.user?.role;

        if (role === "ADMIN") {
          router.replace(`/${locale}/${Routes.ADMIN}`);
        } else {
          router.replace(`/${locale}/${Routes.PROFILE}`);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return <Loader />;

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className="mb-3">
          <FormFields {...field} error={error} />
        </div>
      ))}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? <Loader /> : translations.auth.login.submit}
      </Button>
    </form>
  );
}

export default Form;
