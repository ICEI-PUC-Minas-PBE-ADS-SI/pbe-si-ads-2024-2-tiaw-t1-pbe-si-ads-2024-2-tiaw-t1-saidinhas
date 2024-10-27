function gerarRelatorio(){
    const diario = document.getElementById('diario');
    const semanal = document.getElementById('semanal');
    const mensal = document.getElementById('mensal');
    const datainicio =document.getElementById('datain').value;
    const datafim =document.getElementById('datafim').value;

    if(diario.checked){    
        const win = window.open('', '', 'height=700,width=700');
        win.document.write('<html><head>');
        win.document.write('<title>Relátorio Diário</title>');                             
        win.document.write('</head><body>');
        win.document.write('<h1>Relátorio Diário - Saidinhas</h1>');         
        win.document.write('<h3>Restaurante:Restaurante Mineiro</h3>');
        win.document.write('<h3>Periodo: Diário, de '+datainicio+ ' a '+datafim+'</h3>');
        win.document.write('<h4>Quant. de visitas na sua pagina:24 <br>Quant.de reservas realizadas:12 <br>Quant.de clientes pelo saidinhas:19 <br>Média de avaliações: 4.5/5 (Muito Bom!)<br></h4>');
        win.document.write('</body></html>');
        win.document.close();                         
        win.print();

    }else if(semanal.checked){
        const win = window.open('', '', 'height=700,width=700');
        win.document.write('<html><head>');
        win.document.write('<title>Relátorio Diario</title>');                             
        win.document.write('</head><body>');
        win.document.write('<h1>Relátorio Semanal - Saidinhas</h1>');         
        win.document.write('<h3>Restaurante:Restaurante Mineiro</h3>');
        win.document.write('<h3>Periodo: Semanal, de '+datainicio+ ' a '+datafim+'</h3>');
        win.document.write('<h4>Quant. de visitas na sua pagina:24 <br>Quant.de reservas realizadas:12 <br>Quant.de clientes pelo saidinhas:19 <br>Média de avaliações: 4.5/5 (Muito Bom!)<br></h4>');
        win.document.write('</body></html>');
        win.document.close();                         
        win.print();

    }else if(mensal.checked){
        const win = window.open('', '', 'height=700,width=700');
        win.document.write('<html><head>');
        win.document.write('<title>Relátorio Diario</title>');                             
        win.document.write('</head><body>');
        win.document.write('<h1>Relátorio Mensal - Saidinhas</h1>');         
        win.document.write('<h3>Restaurante:Restaurante Mineiro</h3>');
        win.document.write('<h3>Periodo: Mensal, de '+datainicio+ ' a '+datafim+'</h3>');
        win.document.write('<h4>Quant. de visitas na sua pagina:24 <br>Quant.de reservas realizadas:12 <br>Quant.de clientes pelo saidinhas:19 <br>Média de avaliações: 4.5/5 (Muito Bom!)<br></h4>');
        win.document.write('</body></html>');
        win.document.close();                         
        win.print();

    }
    
}

document.addEventListener('DOMContentLoaded', function() {
    const relatorio=document.getElementById('relatorio');
    if (relatorio) {
        relatorio.addEventListener('click', gerarRelatorio);
    }
});
