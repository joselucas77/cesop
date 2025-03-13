import { LoginForm } from "@/components/forms/login-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginCidadao() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-2xl">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Insira suas credenciais para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-6 text-center flex flex-col">
            <Button variant="link" asChild>
              <Link href="/recuperar-acesso">Esqueçeu a senha?</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/signup">Não possue uma conta?</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
