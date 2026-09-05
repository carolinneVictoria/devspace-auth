"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  SiGithub,
  SiGoogle,
} from "react-icons/si";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, "Digite um nome válido"),
  email: z.string().email(),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

type SigninProps = {
  onLogin: () => void;
};

const Signin = ({ onLogin }: SigninProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
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
          <p className="mt-4 font-medium text-xl">Criar uma conta</p>

          <div className="mt-8 flex items-center gap-3">
            <Button
              className="h-10 w-10 rounded-full"
              size="icon"
              variant="outline"
            >
              <SiGithub className="h-[18px]! w-[18px]!" />
            </Button>
            <Button
              className="h-10 w-10 rounded-full"
              size="icon"
              variant="outline"
            >
              <SiGoogle className="h-[18px]! w-[18px]!" />
            </Button>
          </div>

          <div className="my-7 flex w-full items-center justify-center overflow-hidden">
            <Separator />
            <span className="px-2 text-sm">OR</span>
            <Separator />
          </div>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nome</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                    placeholder="Nome"
                    type="text"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                    placeholder="Email"
                    type="email"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Senha</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    className="w-full"
                    placeholder="Senha"
                    type="password"
                    {...field}
                  />
                  <FieldError errors={[fieldState.error]} />
                </Field>
              )}
            />
            <Button className="mt-4 w-full" type="submit">
              Criar
            </Button>
          </form>

          <div className="mt-5 space-y-5">
            <p className="text-center text-sm">
              Já tem uma conta?
              <button className="ml-1 text-muted-foreground underline cursor-pointer" onClick={onLogin}>
                Faça login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
