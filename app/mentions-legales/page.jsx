'use client'

export default function MentionsLegales() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Mentions Légales</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-secondary mb-4">1. Informations légales</h2>
          <p>
            Le site Dyschool est édité par :<br />
            Dyschool SAS<br />
            4 chemin de la chatterie<br />
            44800 Saint-Herblain<br />
            Email : contact@dyschool.fr<br />
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-secondary mb-4">2. Directeur de la publication</h2>
          <p>
            Le directeur de la publication est :<br />
            Nottebaert Julien<br />
            Contact : contact@dyschool.fr
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-secondary mb-4">3. Hébergement</h2>
          <p>
            Le site Dyschool est hébergé par :<br />
            Vercel Inc.<br />
            340 S Lemon Ave #4133<br />
            Walnut, CA 91789<br />
            États-Unis
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-secondary mb-4">4. Protection des données personnelles</h2>
          <p>
            Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
            vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ces droits, 
            vous pouvez nous contacter à l'adresse email : contact@dyschool.fr
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-secondary mb-4">5. Cookies</h2>
          <p>
            Notre site utilise des cookies pour améliorer votre expérience utilisateur et assurer le bon fonctionnement de nos services. 
            En continuant votre navigation, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité. 
            Vous pouvez à tout moment modifier vos préférences en matière de cookies dans les paramètres de votre navigateur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-secondary mb-4">6. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (structure, textes, logos, images, vidéos, jeux, exercices, etc.) est la propriété exclusive 
            de Dyschool ou de ses partenaires. Toute reproduction, représentation, modification, publication, transmission, 
            dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque 
            support que ce soit est interdite sans l'autorisation écrite préalable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-secondary mb-4">7. Conditions d'utilisation et d'abonnement</h2>
          <p>
            L'utilisation du site Dyschool et de ses services implique l'acceptation pleine et entière des conditions générales d'utilisation 
            et d'abonnement décrites ci-après. Ces conditions sont susceptibles d'être modifiées ou complétées à tout moment.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Les abonnements sont souscrits pour une durée déterminée (mensuelle ou annuelle) et sont renouvelables automatiquement.</li>
            <li>Le prix des abonnements est indiqué en euros TTC. Les prix peuvent être modifiés à tout moment, sous réserve d'une notification préalable.</li>
            <li>La résiliation de l'abonnement peut être effectuée à tout moment via votre espace personnel ou par email à contact@dyschool.fr.</li>
            <li>En cas de résiliation, l'accès aux services premium sera maintenu jusqu'à la fin de la période d'abonnement en cours.</li>
            <li>Les remboursements sont effectués conformément à la législation en vigueur sur la protection du consommateur.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-secondary mb-4">8. Service client</h2>
          <p>
            Pour toute question concernant nos services ou votre abonnement, notre service client est à votre disposition :<br />
            Email : contact@dyschool.fr<br />
            Horaires d'ouverture : Lundi - Vendredi, 9h - 18h
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-secondary mb-4">9. Médiation</h2>
          <p>
            En cas de litige, vous pouvez faire appel à un médiateur de la consommation. Pour Dyschool, le médiateur compétent est :<br />
            Nottebaert Julien<br />
            julien.nottebaert1@gmail.com
          </p>
        </section>
      </div>
    </div>
  )
} 