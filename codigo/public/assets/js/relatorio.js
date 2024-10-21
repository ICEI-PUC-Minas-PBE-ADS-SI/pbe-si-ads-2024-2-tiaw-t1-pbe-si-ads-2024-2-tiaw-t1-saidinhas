const relatorio = document.getElementById('relatorio');

function gerarRelatorio(){
    const diario = document.getElementById('diario');
    const semanal = document.getElementById('semanal');
    const mensal = document.getElementById('mensal');

    var conteudo;
            
    if(diario==true){
        conteudo.textContent="Relatório diario do seu comercio";

        const blob = new Blob([conteudo], { type: 'text/plain' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorioDiario.txt';
        document.body.appendChild(a);
        a.click();
    
        // Remove o link temporário
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }else if(semanal==true){
        conteudo.textContent="Relatório semanal do seu comercio";

        const blob = new Blob([conteudo], { type: 'text/plain' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorioSemanal.txt';
        document.body.appendChild(a);
        a.click();
    
        // Remove o link temporário
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }else if(mensal==true){
        conteudo.textContent="Relatório mensal do seu comercio";

        const blob = new Blob([conteudo], { type: 'text/plain' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorioMensal.txt';
        document.body.appendChild(a);
        a.click();
    
        // Remove o link temporário
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
}

relatorio.addEventListener('click', gerarRelatorio);