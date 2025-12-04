        document.addEventListener('DOMContentLoaded', () => {
            const header = document.getElementById('main-header');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const navLinks = mobileMenu.querySelectorAll('a');

            // 1. Efeito de Scroll no Header
            const handleScroll = () => {
                // Adiciona ou remove a classe de fundo sólido ao rolar
                if (window.scrollY > 50) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
            };
            window.addEventListener('scroll', handleScroll);
            // Executa na carga para ajustar o estado inicial
            handleScroll();

            // 2. Toggle do Menu Mobile
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                // Opcional: Altera o ícone do botão
                const icon = mobileMenuButton.querySelector('svg');
                if (mobileMenu.classList.contains('hidden')) {
                    // Ícone de Hambúrguer
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>';
                } else {
                    // Ícone de Fechar (X)
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
                }
            });

            // 3. Fechar Menu Mobile ao Clicar em Link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        // Garante que o ícone retorne ao estado de hambúrguer
                        mobileMenuButton.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>';
                    }
                });
            });
        });