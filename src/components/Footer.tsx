export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/fortalkLogo.png" className="w-32" alt="Logo Fortalk" />
            </div>
            <p className="text-sm opacity-80">
              Centralize o atendimento da sua empresa de forma organizada e
              eficiente.
            </p>
          </div>

          {/* <div>
            <h3 className="font-bold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Organização
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Relatórios
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Transferências
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Templates
                </a>
              </li>
            </ul>
          </div> */}

          <div>
            <h3 className="font-bold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="#" className="hover:opacity-100 transition-opacity">
                  Sobre nós
                </a>
              </li>
              <li>
                <a
                  href="#depoimentos"
                  className="hover:opacity-100 transition-opacity"
                >
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:opacity-100 transition-opacity">
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
          <p>
            &copy; {new Date().getFullYear()} ForTalk. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
