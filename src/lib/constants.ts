export const NAV_THEME = {
light: {
    background: 'hsl(0 0% 96%)', // background: um branco mais suave
    border: 'hsl(240 6% 85%)',    // border: um cinza claro
    card: 'hsl(0 0% 96%)',        // card: mais próximo do background, mas ainda claro
    notification: 'hsl(0 70% 55%)', // destructive: mantém o vermelho um pouco menos saturado
    primary: 'hsl(240 6% 15%)',    // primary: um tom escuro, mas não preto
    text: 'hsl(240 8% 10%)',       // foreground: um cinza escuro para o texto
},

  dark: {
    background: 'hsl(240 6% 12%)', // background: um tom de cinza escuro
    border: 'hsl(240 5% 20%)',     // border: um cinza mais claro para contraste
    card: 'hsl(240 6% 15%)',       // card: um cinza um pouco mais claro que o fundo
    notification: 'hsl(0 65% 55%)', // destructive: cor de notificação vermelha menos saturada
    primary: 'hsl(0 0% 90%)',      // primary: texto principal em um branco suave
    text: 'hsl(0 0% 85%)',         // foreground: texto cinza claro
},

};
