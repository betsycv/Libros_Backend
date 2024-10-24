-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: applogin
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` decimal(10,0) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `autor` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Alicia en el país de las maravillas','Estás a punto de entrar en el mundo de Alicia el más extraño y asombroso mundo que hayas conocido y que jamás vas a olvidar donde los gatos desaparecen sonrientes y las reinas tienen ejércitos de naipes',680,'alicia.png','Lewis Carroll'),(2,'Ana Karenina','Es una saga fascinante que le sumerge en la opulencia de la Rusia imperial que esta llena de aventuras clandestinas y la eterna lucha entre el deseo y las normas sociales',790,'anak.png','Liev N. Tolstói'),(3,'Crimen y castigo','La historia de un doble crimen cometido por un joven y su subsecuente lucha interna con sus emociones y sus delirios',820,'crimenyc.png','Fiòdor M. Dostoievski'),(4,'El extraño caso del Dr. Jekyll y Mr. Hyde','Un formidable relato de suspense que aborda la lucha entre las diversas personalidades que conviven en un mismo hombre',798,'drjekyll.png','Robert Louis Stevenson'),(5,'El gran Gatsby','Un clásico de la literatura norteamericana que retrata de manera brillante los felices años veinte',599,'gatsby.png','Francis Scott Fitzgerald'),(6,'Orgullo y prejuicio','Es una verdad universalmente aceptada que un hombre soltero en posesión de una notable fortuna necesita una esposa',680,'orgullo.png','Jane Austen'),(7,'1984','Un clásico sobre los totalitarismos y la manipulación de la verdad de una vigencia escalofriante',920,'1984.png','George Orwell'),(8,'El código Da Vinci','Robert Langdon recibe una llamada en mitad de la noche: el conservador del museo del Louvre ha sido asesinado en extrañas circunstancias y junto a su cadáver ha aparecido un desconcertante mensaje cifrado',989,'codigo.png','Dan Brown'),(9,'La Sombra del Viento','Un amanecer de 1945 un muchacho es conducido por su padre a un misterioso lugar oculto en el corazón de la ciudad vieja: El Cementerio de los Libros Olvidados',680,'sombra.png','Carlos Ruiz Zafón'),(10,'Don Quijote de la Mancha','El clásico indiscutible de las letras españolas en una edición única a cargo del profesor Alberto Blecua',745,'quijote.png','Miguel de Cervantes');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'betsyc','$2b$10$x44xOZJFSKYEbgOwf5A4fecraAmjrmEhp3UBmEBLSQ9RhV9yYUYNu','user'),(2,'betsyadmin','$2b$10$8w/ndO7Q9SexugxkZpEYwekMQvD8Jbfun4GiWt.H5/M/lZ5cur0qW','admin'),(3,'jesus','$2b$10$cTurm0SQfvKZg7UHPJqaP.j/JnIfXsq7aZwz7LdCum.lRU4MPu2GS','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-21 19:21:12
