"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordProps = {
  onBack: () => void;
};

const ForgotPassword = ({ onBack }: ForgotPasswordProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="grid h-full w-full p-4 lg:grid-cols-2">
        <div className="relative hidden h-full overflow-hidden rounded-lg lg:block">
          <img
            alt="Login background"
            className="h-full w-full object-cover"
            src="/background.png"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
            <span className="mb-4 text-sm tracking-[0.3em] text-white/70">
              MAIS QUE CÓDIGO
            </span>

            <h1 className="max-w-lg text-5xl font-bold leading-tight">
              Um espaço para as suas ideias{" "}
              <span className="text-violet-400">ganharem vida.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg text-white/70">
              Organize seus projetos, mantenha o foco e evolua todos os dias.
            </p>
          </div>
        </div>

        <div className="m-auto flex w-full max-w-xs flex-col items-center">
          <p className="mt-4 font-medium text-xl">Recuperar sua conta</p>

          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    aria-invalid={fieldState.invalid}
                    className="w-full mt-4"
                    placeholder="Email"
                    type="Digite seu email"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Button className="mt-4 w-full" type="submit">
              Enviar link de recuperação
            </Button>
            <button
              type="button"
              className="mt-5 block w-full text-center text-sm text-muted-foreground underline cursor-pointer"
              onClick={onBack}
            >
              Voltar para o login
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
