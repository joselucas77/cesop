import { SignupForm } from "@/components/forms/signup-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-2xl">
          <CardTitle>Criar Conta</CardTitle>
          <CardDescription>
            Preencha todos os campos obrigatórios(*) para criar uma nova conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <div className="mt-6 text-center flex justify-center">
            <Button variant="link" asChild>
              <Link href="/login/cidadao">Já tem uma conta? Login.</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
