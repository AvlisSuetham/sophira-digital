document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuração do Observador (Intersection Observer)
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento estiver visível na tela (isIntersecting)
            if (entry.isIntersecting) {
                // Adiciona a classe 'animated', que reverte a opacidade para 1 e move o elemento
                entry.target.classList.add('animated');
                // Desativa a observação (a animação só precisa rodar uma vez)
                observer.unobserve(entry.target);
            }
        });
    }, {
        // threshold: 0.1 significa que a animação dispara quando 10% do elemento é visível
        threshold: 0.1 
    });

    // 2. Alvos da Animação
    // Seleciona todos os elementos que têm as classes de estado inicial
    const animatedElements = document.querySelectorAll('.slide-up, .fade-in');

    // 3. Aplica o observador a cada elemento
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});