
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, BookOpen, Users, Trophy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ENICarthageLanding = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            alt="ENICarthage Campus"
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
              Former les ingénieurs de demain pour construire un avenir meilleur
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
              <Link to="/topics" className="gap-2">
                Découvrir nos projets de recherche
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
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
              <h3 className="text-3xl font-bold text-gray-900 mb-2">200+</h3>
              <p className="text-gray-600">Enseignants</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Années d'Excellence</p>
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
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100+</h3>
              <p className="text-gray-600">Partenaires Internationaux</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
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
                alt="Étudiants travaillant ensemble"
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
                  L'École Nationale d'Ingénieurs de Carthage (ENICarthage) est l'une des plus prestigieuses écoles d'ingénieurs en Tunisie. Depuis sa création, elle forme des ingénieurs de haut niveau dans divers domaines technologiques.
                </p>
                <p>
                  Notre mission est de former des ingénieurs polyvalents, créatifs et responsables, capables de relever les défis technologiques du futur tout en contribuant au développement durable de notre société.
                </p>
                <p>
                  Avec des programmes d'études innovants et des partenariats internationaux, nous préparons nos étudiants à devenir les leaders de demain dans leur domaine.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
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
              Découvrez les différents domaines dans lesquels nos équipes de recherche excellent et innovent continuellement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Génie Informatique",
                description: "Intelligence artificielle, sécurité informatique, développement logiciel et systèmes embarqués.",
                icon: BookOpen
              },
              {
                title: "Génie Électrique",
                description: "Systèmes électroniques, automatisation, robotique et systèmes de communication.",
                icon: BookOpen
              },
              {
                title: "Génie Mécanique",
                description: "Conception mécanique, énergétique, matériaux et production industrielle.",
                icon: BookOpen
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
                      <domain.icon className="h-6 w-6 text-indigo-600" />
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

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">
              Prêt à Commencer Votre Projet de Recherche?
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
