export function TimeWasteSection() {
  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Otimização
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Quanto tempo você nem percebe mas acaba perdendo fazendo gestão
                de todos WhatsApps da sua empresa?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Seja dos aparelhos celulares, dos atendimentos que estão nesses
                WhatsApps. Se pudesse ter tudo isso em um único lugar, podendo
                consultar isso até do seu celular, de qualquer lugar a qualquer
                hora?
              </p>
            </div>

            <div className="aspect-square rounded-lg flex items-center justify-center">
              <div className="text-center">
                <img src="/5.webp" alt="Economize Tempo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square  rounded-lg flex items-center justify-center">
              <div className="text-center">
                <img src="/6.webp" alt="Conecte Instagram" />
              </div>
            </div>

            <div>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Instagram
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Conecte o seu Instagram também e atenda suas DM's
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Atenda suas mensagens diretas do Instagram diretamente na
                plataforma ForTalk, centralizando ainda mais o atendimento da
                sua empresa. Futuramente, você poderá fazer posts, agendamento
                de posts, stories e muito mais.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
