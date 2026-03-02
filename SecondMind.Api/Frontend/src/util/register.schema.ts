// register.schema.ts
import { z } from "zod";

export const registerSchema = z.object({
    registerEmail: z
        .string()
        .min(1, "E-Mail ist erforderlich")
        .email("Ungültige E-Mail-Adresse"),

    // TODO: Später passwort wieder min hoch setzen
    registerPassword: z
        .string()
        .min(1, "Passwort muss mindestens 12 Zeichen lang sein")
        .max(128, "Passwort ist zu lang"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;