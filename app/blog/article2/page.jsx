import Image from 'next/image'
import ImgBlog2 from '@/public/asset/home/blog2.jpeg'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Article2 () {
  return (
    <div className='flex mt-16 flex-col gap-8 max-w-5xl mx-auto px-5'>
      <Link href='/blog' className='text-primary-500 underline text-start text-sm md:text-lg'> <FontAwesomeIcon icon={faArrowLeft} className='text-md mr-2' /> Retour à la liste des articles</Link>
      <h2 className='normal-case font-bold text-center text-2xl md:text-5xl'>Témoignages de Sophie et Thomas, parents d'Alice</h2>
      <p className='text-center text-sm md:text-lg'>Temps de lecture : 16 mins</p>
      <div className='w-full  md:h-96  h-40 sm:h-64 relative'>
        <Image src={ImgBlog2} fill className='rounded-xl' style={{ objectFit: 'cover' }} />
      </div>
      <p className='text-justify text-sm md:text-lg'>
        Naviguer dans la complexité des troubles DYS peut être un défi quotidien pour les familles. Sophie et Thomas, parents d’Alice, une enfant de 10 ans diagnostiquée avec une dyslexie, une dysorthographie et une dyspraxie, ont accepté de partager leur parcours. Leur histoire illustre les épreuves, mais aussi les réussites et les solutions qui permettent à des enfants comme Alice de s’épanouir malgré les obstacles.
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>1. La découverte des troubles DYS</h3>
      <p className='text-justify text-sm md:text-lg'>

        Sophie : <br /> "Quand Alice a commencé l’école primaire, nous avons vite remarqué qu’elle avait du mal à suivre. Elle inversait des lettres, son écriture était illisible et elle se fatiguait rapidement. Nous pensions que cela passerait avec le temps, mais en CE1, son institutrice nous a conseillé de consulter un orthophoniste.
        Après plusieurs tests, le diagnostic est tombé : Alice souffre de plusieurs troubles DYS. À ce moment-là, nous étions complètement perdus. Nous n’avions jamais entendu parler de ces troubles auparavant, et nous ne savions pas comment l’aider." <br /> <br />

        Thomas : <br /> "En tant que parents, on se sent coupables. On se demande si on a raté quelque chose, si on aurait dû faire autrement. Mais on a vite compris que ce n’était pas de notre faute et qu’il fallait maintenant se concentrer sur le soutien à apporter à Alice."
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        2. Le quotidien avec une enfant multi-DYS
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        Sophie : <br /> "Le quotidien n’est pas toujours simple. Alice a besoin de beaucoup plus de temps pour faire ses devoirs. Écrire une phrase peut lui prendre dix minutes, et elle doit souvent recommencer à cause des erreurs d’orthographe ou des lettres mal formées. En plus, elle a du mal à s’organiser, ce qui génère beaucoup de frustration.
        Mais ce qui est le plus difficile, c’est de voir qu’elle se sent différente des autres. Elle nous a déjà dit plusieurs fois qu’elle était 'nulle', ce qui brise le cœur de n’importe quel parent. On a dû travailler dur pour l’aider à retrouver confiance en elle." <br /> <br />

        Thomas : <br /> "Pour alléger son quotidien, on a aménagé des outils spécifiques : un ordinateur pour ses devoirs, des polices adaptées comme OpenDyslexic, et des cartes mentales pour ses révisions. On a aussi appris à mieux gérer notre propre stress pour être plus disponibles émotionnellement pour elle."
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        3. Le psychologue scolaire ou psychologue clinicien
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        Sophie : <br /> "Nous avons la chance d’être entourés par une équipe de professionnels extraordinaires : une orthophoniste, une psychomotricienne et une enseignante spécialisée. Chacun joue un rôle crucial dans les progrès d’Alice.
        L’orthophoniste l’aide à améliorer sa lecture et son écriture. La psychomotricienne travaille sur sa coordination, essentielle pour compenser sa dyspraxie. Quant à l’enseignante spécialisée, elle l’aide à s’adapter aux attentes scolaires en utilisant des outils pédagogiques adaptés."
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        4. Le rôle clé des professionnels
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        Thomas : <br /> "Un jour, nous avons découvert l’application Dyschool. C’était une révélation. Les jeux sont amusants et parfaitement adaptés aux besoins d’Alice. Elle adore les défis et aime recevoir des encouragements lorsqu’elle réussit une activité.
        En tant que parents, nous utilisons l’espace dédié pour suivre ses progrès. Les statistiques sur son temps d’écran et ses réussites nous permettent de mieux comprendre ses points forts et ses difficultés. Cela nous aide à ajuster son accompagnement au quotidien." <br /> <br />

        Sophie : <br />"L’avantage de cette application, c’est qu’elle prend en compte tous les troubles DYS d’Alice. La plupart des outils se concentrent sur un seul aspect, mais Dyschool propose une approche globale. Cela fait une énorme différence."
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        5. Les solutions numériques : un tournant dans leur parcours
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        Thomas : <br /> "Un jour, nous avons découvert l’application Dyschool. C’était une révélation. Les jeux sont amusants et parfaitement adaptés aux besoins d’Alice. Elle adore les défis et aime recevoir des encouragements lorsqu’elle réussit une activité.
        En tant que parents, nous utilisons l’espace dédié pour suivre ses progrès. Les statistiques sur son temps d’écran et ses réussites nous permettent de mieux comprendre ses points forts et ses difficultés. Cela nous aide à ajuster son accompagnement au quotidien." <br /> <br />

        Sophie : <br /> "L’avantage de cette application, c’est qu’elle prend en compte tous les troubles DYS d’Alice. La plupart des outils se concentrent sur un seul aspect, mais Dyschool propose une approche globale. Cela fait une énorme différence."
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        6. Les progrès d’Alice et l’espoir pour l’avenir
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        Thomas : <br /> "Depuis que nous avons mis en place ces outils et ce suivi, Alice a fait d’énormes progrès. Elle lit mieux, écrit plus rapidement et se sent plus confiante. Elle sait qu’elle a des difficultés, mais elle commence à comprendre qu’elle a aussi des forces.
        Le chemin est encore long, mais nous sommes fiers de tout ce qu’elle a accompli. Nous avons appris à célébrer chaque petite victoire, car chacune d’elles est une étape vers une plus grande autonomie." <br /> <br />

        Sophie : <br /> "Pour nous, le plus important, c’est qu’elle soit heureuse et qu’elle se sente valorisée. Nous espérons que son parcours inspirera d’autres parents à ne pas baisser les bras. Avec les bons outils et un accompagnement adapté, chaque enfant peut s’épanouir."
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        7. Un message d'encouragement
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        La famille d’Alice montre que, malgré les défis, il est possible de transformer les difficultés en opportunités. Leur témoignage souligne l’importance de l’accompagnement familial, du soutien des professionnels et des solutions numériques adaptées comme Dyschool.
        Chaque enfant est unique, et chaque famille a son propre chemin à tracer. Mais avec de l’amour, de la patience et les bons outils, les troubles DYS peuvent être surmontés, et les enfants peuvent révéler tout leur potentiel.
      </p>
    </div>
  )
}
