
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Users, BookOpen, Globe, Lightbulb, Zap, CircuitBoard, Shield, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ENICarthageLanding = () => {
  return (
    <div className="min-h-screen">
      {/* Section Hero */}
      <section className="relative h-[80vh] bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            alt="Campus ENICarthage"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              École Nationale d'Ingénieurs de Carthage
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8">
              Une institution d'excellence formant les ingénieurs de demain
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
              <Link to="/topics" className="inline-flex items-center gap-2">
                Découvrir nos projets de recherche
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">3000+</h3>
              <p className="text-gray-600">Étudiants</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">150+</h3>
              <p className="text-gray-600">Enseignants-chercheurs</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">6</h3>
              <p className="text-gray-600">Départements</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">30+</h3>
              <p className="text-gray-600">Partenaires Internationaux</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                alt="Étudiants de l'ENICarthage"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Une Formation d'Excellence en Ingénierie
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fondée en 2003, l'École Nationale d'Ingénieurs de Carthage (ENICarthage) est un établissement public d'enseignement supérieur tunisien qui forme des ingénieurs de haut niveau dans différents domaines technologiques.
                </p>
                <p>
                  Située à Tunis, l'ENICarthage offre six filières de formation : Génie Informatique, Génie des Télécommunications, Génie Industriel, Génie Mécanique, Génie Civil et Génie Électrique.
                </p>
                <p>
                  Notre mission est de former des ingénieurs polyvalents et innovants, capables de répondre aux défis technologiques actuels et futurs, tout en contribuant au développement économique et social de la Tunisie.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NOUVELLE SECTION: Laboratoire de Recherche EI&TIC */}
      <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Laboratoire de Recherche EI&TIC
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Le Laboratoire de Recherche Electricité Intelligente et Technologies de l'Information et des Communications (EI&TIC Lab) se concentre sur la mise de l'électricité et du traitement de l'information au service du développement durable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Smart Grid",
                description: "Réseaux électriques intelligents pour une gestion optimisée de l'énergie",
                icon: <Zap className="h-6 w-6 text-indigo-600" />
              },
              {
                title: "Véhicule Électrique",
                description: "Technologies innovantes pour la mobilité électrique durable",
                icon: <Lightbulb className="h-6 w-6 text-indigo-600" />
              },
              {
                title: "Systèmes Électroniques HF",
                description: "Conception et optimisation de systèmes électroniques haute fréquence",
                icon: <CircuitBoard className="h-6 w-6 text-indigo-600" />
              },
              {
                title: "Biométrie et Sécurité",
                description: "Solutions avancées pour l'authentification et la protection des données",
                icon: <Shield className="h-6 w-6 text-indigo-600" />
              },
              {
                title: "E-Health & Mobile Cloud",
                description: "Applications de santé connectée et solutions cloud mobiles",
                icon: <Cloud className="h-6 w-6 text-indigo-600" />
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 border border-indigo-100"
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {project.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 bg-indigo-50 rounded-xl p-6 border border-indigo-100"
          >
            <h3 className="text-xl font-bold text-indigo-800 mb-4">Les trois piliers du développement durable</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <h4 className="font-semibold text-indigo-700 mb-2">Économique</h4>
                <p className="text-gray-600 text-sm">
                  Efficacité économique à travers l'amélioration de la conception et des modes de production, de consommation et de gestion, ainsi que la mutualisation des ressources et la minimisation des coûts.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <h4 className="font-semibold text-indigo-700 mb-2">Social</h4>
                <p className="text-gray-600 text-sm">
                  Satisfaire des besoins humains sur les questions de santé, de transport, d'information, de sécurité et de confort pour une meilleure qualité de vie.
                </p>
              </div>
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <h4 className="font-semibold text-indigo-700 mb-2">Environnemental</h4>
                <p className="text-gray-600 text-sm">
                  Préserver, améliorer et valoriser l'environnement et les ressources naturelles sur le long terme, en réduisant les risques et en prévenant les impacts environnementaux.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Domaines de Recherche */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Domaines de Recherche
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les domaines d'excellence où nos équipes de recherche innovent et excellent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Génie Informatique",
                description: "Intelligence artificielle, cybersécurité, génie logiciel, systèmes embarqués et IoT."
              },
              {
                title: "Télécommunications",
                description: "Réseaux 5G, systèmes de communication sans fil, traitement du signal et des images."
              },
              {
                title: "Génie Industriel",
                description: "Industrie 4.0, optimisation des processus, gestion de la production et logistique."
              }
            ].map((domain, index) => (
              <motion.div
                key={domain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {domain.title}
                    </h3>
                    <p className="text-gray-600">
                      {domain.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section Stratégie Nationale du Développement Durable */}
      <section className="py-16 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stratégie Nationale du Développement Durable
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Notre laboratoire s'inscrit parfaitement dans la Stratégie Nationale du Développement Durable, 
              à travers ses onze principaux défis:
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Instaurer une consommation et une production durables (économie verte)",
              "Renforcer l'équité sociale et la solidarité nationale",
              "Gérer durablement les ressources naturelles",
              "Promouvoir la qualité de vie des citoyens",
              "Développer des villes durables",
              "Gérer harmonieusement et durablement le littoral",
              "Promouvoir un transport durable",
              "Rationaliser la consommation énergétique et promouvoir les énergies nouvelles et renouvelables",
              "Renforcer les capacités d'adaptation aux changements climatiques",
              "Promouvoir la société du savoir",
              "Adapter la gouvernance pour une meilleure promotion du développement durable"
            ].map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                    <span className="font-bold text-indigo-600">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{challenge}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">
              Prêt à Commencer Votre Projet de Recherche ?
            </h2>
            <p className="text-indigo-100 mb-8">
              Rejoignez notre plateforme pour découvrir les opportunités de recherche et collaborer avec nos professeurs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                <Link to="/register">S'inscrire</Link>
              </Button>
              <Button asChild size="lg" className="bg-indigo-500 hover:bg-indigo-400 text-white">
                <Link to="/topics">Voir les Sujets</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ENICarthageLanding;
