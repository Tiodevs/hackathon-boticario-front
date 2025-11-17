/**
 * Design Tokens do Projeto FOCO
 * Centralizamos aqui todas as cores, espaçamentos e outros valores de design
 */

export const colors = {
  // Cor principal
  primary: '#b6ff00',  // Verde limão
  
  // Backgrounds
  background: {
    main: '#0b0b0b',      // Preto principal
    card: '#1f1f1f',      // Cards e modais
    input: '#ffffff',     // Inputs
    hover: '#2a2a2a',     // Estado hover
  },
  
  // Textos
  text: {
    primary: '#ffffff',    // Texto principal (branco)
    secondary: '#9ca3af',  // Texto secundário (cinza claro)
    muted: '#6b7280',      // Texto desabilitado
  },
  
  // Borders
  border: {
    default: '#3a3a3a',    // Border padrão
    light: '#4a4a4a',      // Border claro
    focus: '#b6ff00',      // Border no foco (verde)
  },
  
  // Status das tarefas (usaremos depois)
  status: {
    pending: '#fbbf24',     // Amarelo/laranja
    inProgress: '#3b82f6',  // Azul
    completed: '#10b981',   // Verde
  },
  
  // Prioridades (usaremos depois)
  priority: {
    low: '#9ca3af',        // Cinza
    medium: '#f59e0b',     // Laranja
    high: '#ef4444',       // Vermelho
  },
} as const;

// Espaçamentos (seguindo o padrão 8px)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

// Raios de borda
export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

// Tipografia
export const typography = {
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;