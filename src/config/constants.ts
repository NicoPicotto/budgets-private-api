export const USER_STATES = {
    INITIAL: "Initial",    // Usuario recién creado, sin actividad aún.
    ACTIVE: "Active",      // Usuario está activo y puede usar el sistema.
    SUSPENDED: "Suspended", // Usuario está bloqueado temporalmente.
    REMOVED: "Removed",    // Usuario eliminado o desactivado.
    INACTIVE: "Inactive",  // Usuario inactivo pero no eliminado.
    PENDING: "Pending",    // Usuario está en proceso de verificación.
} as const;

export const PROJECT_STATES = {
    INITIAL: "Initial",        // Proyecto recién creado.
    IN_PROGRESS: "In Progress", // Proyecto en desarrollo.
    COMPLETED: "Completed",    // Proyecto terminado.
    ON_HOLD: "On Hold",        // Proyecto en pausa.
    CANCELLED: "Cancelled",    // Proyecto cancelado.
    ARCHIVED: "Archived",      // Proyecto archivado.
} as const;

export const CLIENT_STATES = {
    ACTIVE: "Active",      // Cliente activo.
    INACTIVE: "Inactive",  // Cliente inactivo.
    SUSPENDED: "Suspended", // Cliente bloqueado temporalmente.
    REMOVED: "Removed",    // Cliente eliminado.
} as const;

export const BUDGET_STATES = {
    DRAFT: "Draft",             // Presupuesto en borrador, aún no aprobado.
    PENDING_APPROVAL: "Pending Approval", // Presupuesto enviado para aprobación.
    APPROVED: "Approved",       // Presupuesto aprobado.
    ACTIVE: "Active",           // Presupuesto en uso actualmente.
    SUSPENDED: "Suspended",     // Presupuesto temporalmente detenido.
    CANCELLED: "Cancelled",     // Presupuesto cancelado.
    COMPLETED: "Completed",     // Presupuesto finalizado y cerrado.
} as const;


export const ROLES = {
    ADMIN: "Admin",      // Administrador con acceso completo.
    MEMBER: "Member",    // Miembro regular del sistema.
    CLIENT: "Client",    // Cliente con acceso limitado.
    GUEST: "Guest",      // Usuario invitado con permisos mínimos.
    MODERATOR: "Moderator", // Usuario con permisos de moderación.
} as const;

