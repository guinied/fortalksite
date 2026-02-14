export function CompaniesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Junte-se a centenas de empresas que já estão em crescimento
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <img src="/advocacia.jpg" alt="" className="w-20" />
          </div>

          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <img src="/analitica.png" alt="" className="w-20" />
          </div>

          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <img src="/bahtech.png" alt="" className="w-20" />
          </div>

          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <img src="/claves.png" alt="" className="w-20" />
          </div>

          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <img src="/dottovip.png" alt="" className="w-20" />
          </div>

          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <img src="/etecc.jpg" alt="" className="w-20" />
          </div>

          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <img src="/haeser.png" alt="" className="w-20" />
          </div>

          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <img src="/inetvip.png" alt="" className="w-20" />
          </div>

          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <img src="/valutech.jpg" alt="" className="w-20" />
          </div>

          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
            <img src="/violato.jpeg" alt="" className="w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
