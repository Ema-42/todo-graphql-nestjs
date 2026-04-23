export interface JwtPayload {
    id: string; // ID del usuario
    iat: number; // Fecha de emisión del token (opcional)
    exp: number; // Fecha de expiración del token (opcional)
}