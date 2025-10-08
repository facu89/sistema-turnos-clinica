
import { Stethoscope } from "lucide-react"
import LoginForm from "./login/LoginForm"
import AdditionalFeatures from "./login/AditionalFeatures"

export default function LoginPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Stethoscope className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-balance">ClinicaTurnos</h1>
            <p className="text-muted-foreground text-pretty">Sistema de gestión médica integral</p>
          </div>
        </div>

        <LoginForm />
        <AdditionalFeatures></AdditionalFeatures>
      </div>
    </div>
  )
}
