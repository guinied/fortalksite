"use client";

import { useForm } from "@tanstack/react-form";

import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import FieldInfo from "@/components/FieldInfo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/authContext";

export default function AuthPage() {
  const { setUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const registerForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      organizationName: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      const response = await fetch(
        "https://api.fortalk.app.br/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values.value),
        }
      ).then((res) => res.json());

      if (response.error) {
        setIsLoading(false);
        return toast.error(response.error);
      }

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);

      setUser(response.user);

      toast.success("Registro realizado com sucesso");
      setIsLoading(false);

      router.push("/");
    },
  });

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      const response = await fetch("https://api.fortalk.app.br/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.value),
      }).then((res) => res.json());

      if (response.error) {
        setIsLoading(false);
        return toast.error(response.error);
      }

      setUser(response.user);

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);

      toast.success("Login realizado com sucesso");
      setIsLoading(false);

      router.push("/");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o início
        </Link>

        <Card className="p-6 shadow-lg border-none">
          <div className="flex flex-col items-center !space-y-2">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">O</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">
              Bem-vindo a Fortalk
            </h1>
            <p className="text-gray-500 text-center mb-2">
              Seja referência em atendimento conosco.
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full !text-black">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="!text-black">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="signup" className="!text-black">
                Criar Conta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  loginForm.handleSubmit();
                }}
                className="space-y-4"
              >
                <loginForm.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? "O email é obrigatório" : undefined,
                  }}
                  children={(field) => {
                    const hasError = !!field.state.meta.errors?.length;

                    return (
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div>
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            id={field.name}
                            name={field.name}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            value={field.state.value}
                            className={`${
                              hasError
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-border"
                            }`}
                          />

                          <FieldInfo field={field} />
                        </div>
                      </div>
                    );
                  }}
                />

                <loginForm.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? "A senha é obrigatória" : undefined,
                  }}
                  children={(field) => {
                    const hasError = !!field.state.meta.errors?.length;

                    return (
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Senha</Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            id={field.name}
                            name={field.name}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            value={field.state.value}
                            className={`${
                              hasError
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-border"
                            }`}
                          />

                          <Button
                            onClick={() => setShowPassword(!showPassword)}
                            variant="ghost"
                            className="absolute right-2 top-0 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          <FieldInfo field={field} />
                        </div>
                      </div>
                    );
                  }}
                />

                <Button
                  type="submit"
                  className="w-full text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>

                <div className="text-center">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  registerForm.handleSubmit();
                }}
                className="space-y-4"
              >
                <registerForm.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? "O nome é obrigatório"
                        : value.length < 3
                        ? "O nome deve ter pelo menos 3 caracteres"
                        : undefined,
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      return (
                        value.includes("error") && 'No "error" allowed in name'
                      );
                    },
                  }}
                  children={(field) => {
                    const hasError = !!field.state.meta.errors?.length;

                    return (
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Nome Completo</Label>
                        <div>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="text"
                            placeholder="Seu nome"
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            value={field.state.value}
                            className={`${
                              hasError
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-border"
                            }`}
                          />

                          <FieldInfo field={field} />
                        </div>
                      </div>
                    );
                  }}
                />

                <registerForm.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? "O email é obrigatório"
                        : !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            value
                          )
                        ? "O email deve ser válido"
                        : undefined,
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      return (
                        value.includes("error") && 'No "error" allowed in email'
                      );
                    },
                  }}
                  children={(field) => {
                    const hasError = !!field.state.meta.errors?.length;

                    return (
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="email"
                            placeholder="seu@email.com"
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            value={field.state.value}
                            className={`${
                              hasError
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-border"
                            }`}
                          />

                          <FieldInfo field={field} />
                        </div>
                      </div>
                    );
                  }}
                />

                <registerForm.Field
                  name="password"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? "A senha é obrigatória"
                        : value.length < 6
                        ? "A senha deve ter pelo menos 6 caracteres"
                        : undefined,
                    onChangeAsyncDebounceMs: 500,
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      return (
                        value.includes("error") && 'No "error" allowed in name'
                      );
                    },
                  }}
                  children={(field) => {
                    const hasError = !!field.state.meta.errors?.length;

                    return (
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Senha</Label>
                        <div className="relative">
                          <Input
                            id={field.name}
                            name={field.name}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            value={field.state.value}
                            className={`${
                              hasError
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-border"
                            }`}
                          />

                          <Button
                            onClick={() => setShowPassword(!showPassword)}
                            variant="ghost"
                            className="absolute right-2 top-0 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          <FieldInfo field={field} />
                        </div>
                      </div>
                    );
                  }}
                />

                <registerForm.Field
                  name="confirmPassword"
                  validators={{
                    onChange: ({ value }) =>
                      value !== registerForm.getFieldValue("password")
                        ? "As senhas não coincidem"
                        : undefined,
                  }}
                  children={(field) => {
                    const hasError = !!field.state.meta.errors?.length;

                    return (
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Confirmar Senha</Label>
                        <div className="relative">
                          <Input
                            id={field.name}
                            name={field.name}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            value={field.state.value}
                            className={`${
                              hasError
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-border"
                            }`}
                          />

                          <Button
                            onClick={() => setShowPassword(!showPassword)}
                            variant="ghost"
                            className="absolute right-2 top-0 p-0"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          <FieldInfo field={field} />
                        </div>
                      </div>
                    );
                  }}
                />

                <registerForm.Field
                  name="organizationName"
                  validators={{
                    onChange: ({ value }) =>
                      !value
                        ? "O nome da empresa é obrigatório"
                        : value.length < 3
                        ? "O nome da empresa deve ter pelo menos 3 caracteres"
                        : undefined,
                  }}
                  children={(field) => {
                    const hasError = !!field.state.meta.errors?.length;

                    return (
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Nome da empresa</Label>
                        <div className="relative">
                          <Input
                            id={field.name}
                            name={field.name}
                            type="text"
                            placeholder="Nome da empresa"
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            value={field.state.value}
                            className={`${
                              hasError
                                ? "border-red-500 focus-visible:ring-red-500"
                                : "border-border"
                            }`}
                          />

                          <FieldInfo field={field} />
                        </div>
                      </div>
                    );
                  }}
                />

                <Button
                  type="submit"
                  className="w-full text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando conta..." : "Criar Conta"}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  Ao criar uma conta, você concorda com nossos{" "}
                  <a href="#" className="text-primary hover:underline">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-primary hover:underline">
                    Política de Privacidade
                  </a>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
