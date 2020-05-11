-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: project711
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `original_books`
--

DROP TABLE IF EXISTS `original_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `original_books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `trans_num` int NOT NULL DEFAULT '0',
  `language` varchar(45) NOT NULL,
  `download_loc` varchar(100) NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `status_info` varchar(100) NOT NULL DEFAULT 'Normal',
  PRIMARY KEY (`id`),
  UNIQUE KEY `download_loc_UNIQUE` (`download_loc`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `original_books`
--

LOCK TABLES `original_books` WRITE;
/*!40000 ALTER TABLE `original_books` DISABLE KEYS */;
INSERT INTO `original_books` VALUES (18,'qwe1',NULL,'123',0,'3','url1231',0,'Normal');
/*!40000 ALTER TABLE `original_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_waiting_room`
--

DROP TABLE IF EXISTS `trans_waiting_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_waiting_room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `original_id` int NOT NULL,
  `original_language` varchar(45) NOT NULL,
  `target_language` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_waiting_room`
--

LOCK TABLES `trans_waiting_room` WRITE;
/*!40000 ALTER TABLE `trans_waiting_room` DISABLE KEYS */;
INSERT INTO `trans_waiting_room` VALUES (1,'123','123',18,'eng','ch');
/*!40000 ALTER TABLE `trans_waiting_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `translated_books`
--

DROP TABLE IF EXISTS `translated_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translated_books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `original_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `language` varchar(45) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `status_info` varchar(100) NOT NULL DEFAULT 'normal',
  `translator_id` int NOT NULL,
  `translation_reviewer_id` int DEFAULT NULL,
  `cultrue_reviewer_id` int DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `download_loc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translated_books`
--

LOCK TABLES `translated_books` WRITE;
/*!40000 ALTER TABLE `translated_books` DISABLE KEYS */;
INSERT INTO `translated_books` VALUES (12,5,NULL,NULL,'Lao','2010-04-29',NULL,0,'normal',8,9,NULL,5,'link'),(13,5,NULL,NULL,'Tetun','2010-04-29',NULL,0,'normal',8,9,NULL,5,'link2'),(14,6,NULL,NULL,'Lao','2010-04-29',NULL,0,'normal',8,9,NULL,5,'link3'),(15,6,NULL,NULL,'Tetun','2010-04-29',NULL,0,'normal',8,9,NULL,5,'link4'),(16,7,NULL,NULL,'Lao','2010-04-29',NULL,0,'normal',8,9,NULL,5,'link5'),(17,7,NULL,NULL,'Tetun','2010-04-29',NULL,0,'normal',8,9,NULL,5,'link6'),(19,5,NULL,NULL,'Chinese','2020-04-30',NULL,0,'normal',55,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `translated_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` int NOT NULL DEFAULT '0',
  `rolename` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL DEFAULT 'Junior translator',
  `can_review` int NOT NULL DEFAULT '0',
  `experience` int NOT NULL DEFAULT '0',
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `translation_num` int NOT NULL DEFAULT '0',
  `review_num` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '0',
  `address` varchar(100) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,0,'admin','Junior translator',1,2,'a1','cfb0c71a65126a9160f3b5a3b9c40762',0,0,0,NULL,NULL,NULL,NULL,NULL),(8,1,'translator','Junior translator',0,0,'a2','cfb0c71a65126a9160f3b5a3b9c40762',0,0,0,NULL,NULL,NULL,NULL,NULL),(9,2,'translation reivewer','Junior translator',0,0,'a3','cfb0c71a65126a9160f3b5a3b9c40762',0,0,0,NULL,NULL,NULL,NULL,NULL),(10,3,'culture reviewer','Junior translator',0,0,'a4','cfb0c71a65126a9160f3b5a3b9c40762',0,0,0,NULL,NULL,NULL,NULL,NULL),(11,4,'copy reviewer','Junior translator',0,0,'a5','cfb0c71a65126a9160f3b5a3b9c40762',0,0,0,NULL,NULL,NULL,NULL,NULL),(13,4,'copy reviewer','Junior translator',0,0,'a666','cfb0c71a65126a9160f3b5a3b9c40762',0,0,0,NULL,NULL,NULL,NULL,NULL),(14,1,'translator','Junior translator',0,40,'test','cfb0c71a65126a9160f3b5a3b9c40762',0,0,0,'fffff','undefined','undefined','undefined','undefined');
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

-- Dump completed on 2020-05-11 13:41:49
