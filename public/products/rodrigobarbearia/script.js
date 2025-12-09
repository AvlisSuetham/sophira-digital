// Aguarda o DOM carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Funcionalidade para o botão de Agendar (rolagem suave)
    const agendarBtn = document.getElementById('agendarBtn');
    const contatoSection = document.getElementById('contato');

    agendarBtn.addEventListener('click', function() {
        contatoSection.scrollIntoView({ behavior: 'smooth' });
    });

    // 2. Manipulação e Captura de Lead (simulação de envio)
    const leadForm = document.getElementById('leadForm');
    const formMessage = document.getElementById('formMessage');

    leadForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // NOVO: Captura dos novos campos
        const horario = document.getElementById('horario').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();


        // **Validação Simples**
        if (nome === "" || telefone === "" || horario === "") {
            formMessage.textContent = "Por favor, preencha seu nome, telefone e horário desejado!";
            formMessage.style.color = 'red';
            return;
        }
        
        // **Simulação de Processamento do Lead**
        console.log("--- NOVO LEAD CAPTURADO ---");
        console.log(`Nome: ${nome}`);
        console.log(`Telefone: ${telefone}`);
        console.log(`Email: ${email || 'Não informado'}`);
        console.log(`Horário Desejado: ${horario}`); // NOVO DADO
        console.log(`Mensagem: ${mensagem || 'Nenhuma mensagem adicional'}`); // NOVO DADO
        

        // Feedback para o usuário
        formMessage.innerHTML = `✅ Feito, ${nome}! Agendamento no horário das ${horario} recebido. Entraremos em contato pelo número ${telefone} via WhatsApp para confirmação.`;
        formMessage.style.color = 'green';
        
        leadForm.reset(); // Limpa o formulário após o "envio"

        // Opcional: Redirecionar para o WhatsApp
        // Se você quiser incluir os dados no link do WhatsApp:
        /*
        const whatsappText = `Olá, gostaria de agendar. Meu nome é ${nome}. Telefone: ${telefone}. Horário preferido: ${horario}. Mensagem: ${mensagem}`;
        const whatsappUrl = `https://wa.me/SEUNUMERODDDI?text=${encodeURIComponent(whatsappText)}`;
        window.open(whatsappUrl, '_blank');
        */
    });

    // 3. Navegação Suave para links internos
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});