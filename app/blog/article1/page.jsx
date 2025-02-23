import Image from 'next/image'
import ImgBlog1 from '@/public/asset/home/blog1.jpg'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export default function Article1 () {
  return (
    <div className='flex mt-16 flex-col gap-8 max-w-5xl mx-auto px-5'>
      <Link href='/blog' className='text-primary-500 underline text-start text-sm md:text-lg'> <FontAwesomeIcon icon={faArrowLeft} className='text-md mr-2' /> Retour à la liste des articles</Link>
      <h2 className='normal-case font-bold text-center text-2xl md:text-5xl'>Quels professionnels peuvent diagnostiquer les troubles DYS ?</h2>
      <p className='text-center text-sm md:text-lg'>Temps de lecture : 8 mins</p>
      <div className='w-full  md:h-96  h-40 sm:h-64 relative'>
        <Image src={ImgBlog1} fill className='rounded-xl' style={{ objectFit: 'cover' }} />
      </div>
      <p className='text-justify text-sm md:text-lg'>
        Les troubles DYS (dyslexie, dyscalculie, dyspraxie, dysphasie, etc.) sont des troubles spécifiques de l'apprentissage qui touchent de nombreux enfants. Le diagnostic de ces troubles est essentiel pour permettre une prise en charge précoce et adaptée, afin de favoriser le développement de l’enfant. Dans cet article, nous vous expliquons qui sont les professionnels habilités à poser un diagnostic sur les troubles DYS et comment ils peuvent aider dans ce processus.
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>1. Le médecin généraliste</h3>
      <p className='text-justify text-sm md:text-lg'>

        Le premier professionnel vers lequel se tournent souvent les parents d’enfants présentant des signes de troubles DYS est le médecin généraliste. Bien qu'il ne soit pas spécialisé dans les troubles de l’apprentissage, il joue un rôle crucial dans l'orientation des familles. Si des difficultés sont observées, il pourra orienter les parents vers des spécialistes (orthophonistes, psychologues, etc.) pour effectuer un diagnostic plus approfondi. Un médecin généraliste est souvent le point de départ pour obtenir une prise en charge.
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        2. L’orthophoniste
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        L'orthophoniste est un des premiers professionnels de santé sollicités pour poser un diagnostic sur des troubles comme la dyslexie ou la dysorthographie. En effet, l'orthophoniste évalue les difficultés liées à la lecture, l'écriture et parfois le langage oral. Il réalise un bilan approfondi des compétences linguistiques de l'enfant et émet un diagnostic sur la nature des troubles. Ce diagnostic est essentiel pour établir un programme de rééducation adapté.
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        3. Le psychologue scolaire ou psychologue clinicien
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        Le psychologue scolaire, spécialisé dans les difficultés d’apprentissage, est un autre acteur clé pour le diagnostic des troubles DYS. Il peut réaliser des tests psychométriques et des bilans cognitifs pour évaluer le profil de l’enfant et ses capacités intellectuelles. Ce professionnel peut poser un diagnostic sur des troubles comme la dyscalculie (trouble des compétences en mathématiques) ou la dyspraxie (trouble des coordinations motrices). Le psychologue clinicien, quant à lui, peut évaluer plus globalement l’état émotionnel et psychologique de l’enfant, ce qui peut également jouer un rôle dans le diagnostic des troubles DYS.
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        4. Le neuropsychologue
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        Le neuropsychologue est un expert dans l’évaluation des fonctions cognitives. Il peut réaliser des bilans complets afin de détecter des troubles DYS complexes, souvent associés à d’autres difficultés neuro-développementales. Le neuropsychologue est particulièrement impliqué dans le diagnostic des troubles comme la dyscalculie et la dyspraxie, mais peut aussi apporter un éclairage sur des troubles de l’attention, du raisonnement ou de la mémoire.
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        5. Le pédiatre spécialisé en développement
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        Un pédiatre spécialisé dans le développement de l’enfant est également un professionnel clé dans le diagnostic des troubles DYS. Bien qu’il ne réalise pas de tests psychométriques, il peut détecter des signes précoces de troubles de l’apprentissage. En fonction de son évaluation, il orientera les parents vers les professionnels adaptés (orthophonistes, psychologues, neuropsychologues) pour confirmer le diagnostic.
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        6. Le neuro-pédiatre
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        Le neuro-pédiatre, spécialiste des troubles du système nerveux de l’enfant, est un autre professionnel qui peut participer au diagnostic des troubles DYS. Il réalise des examens médicaux pour écarter des causes organiques et orienter vers les soins nécessaires. Le neuro-pédiatre peut être consulté lorsque les troubles DYS sont associés à des pathologies neurologiques.
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        7. L'érgothérapeute
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        L’ergothérapeute est particulièrement impliqué dans l’évaluation de la dyspraxie, trouble qui touche les compétences motrices et l’organisation de l’espace. Lorsqu’un enfant présente des difficultés à coordonner ses gestes ou à accomplir des tâches motrices simples, l'ergothérapeute peut réaliser un bilan pour évaluer l’ampleur de ces troubles et proposer une prise en charge.
      </p>
      <h3 className='font-bold text-secondary text-lg md:text-2xl'>        Le médecin scolaire
      </h3>
      <p className='text-justify text-sm md:text-lg'>

        Le médecin scolaire, bien qu'il n'effectue pas de diagnostic formel, joue un rôle important dans la détection des troubles DYS dans le cadre scolaire. Il peut effectuer un suivi de l’état de santé de l’enfant, repérer des difficultés d’apprentissage et orienter les parents vers des spécialistes pour un diagnostic formel.
      </p>
      <p className='text-justify text-sm md:text-lg'>

        Pour résumer, le diagnostic des troubles DYS nécessite souvent l’intervention de plusieurs professionnels de santé et éducatifs.
        Les orthophonistes, psychologues scolaires, neuropsychologues et pédiatres spécialisés sont les plus directement impliqués dans ce processus. Il est essentiel de consulter un ou plusieurs de ces spécialistes pour établir un diagnostic précis et garantir une prise en charge optimale de l’enfant.
        Si vous pensez que votre enfant présente des troubles d’apprentissage, n'hésitez pas à consulter un professionnel pour lui offrir le soutien dont il a besoin”.
      </p>
      <p className='text-justify text-sm md:text-lg'>

        Ci-dessous, le lien vers la FFDYS pour d’éventuelles questions : <br />
        <Link href='https://www.ffdys.com/troubles-dys/reperage-depistage-des-la-petite-enfance/' target='_blank' rel='noreferrer' className='underline font-bold'>
          https://www.ffdys.com/troubles-dys/reperage-depistage-des-la-petite-enfance/
        </Link>
      </p>
    </div>
  )
}
