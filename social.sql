-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: social
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `CommentID` bigint NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) NOT NULL,
  `Comment` mediumtext NOT NULL,
  `CommentedAt` datetime NOT NULL,
  `PostID` bigint NOT NULL,
  UNIQUE KEY `CommentID_UNIQUE` (`CommentID`),
  KEY `Fk_post_idx` (`PostID`),
  KEY `Fk_now` (`Username`),
  CONSTRAINT `Fk_now` FOREIGN KEY (`Username`) REFERENCES `userstable` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Ajay','Yo','2021-12-09 12:54:48',1),(4,'Ajay','Yo','2021-12-09 13:01:29',1),(5,'Ajay','hehe','2021-12-09 13:01:35',1),(6,'Akash','Yo','2021-12-09 13:03:07',2),(7,'Amrut','hehe','2021-12-09 13:03:22',1);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_list`
--

DROP TABLE IF EXISTS `friend_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_list` (
  `User_ID` varchar(45) NOT NULL,
  `Friend_ID` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_list`
--

LOCK TABLES `friend_list` WRITE;
/*!40000 ALTER TABLE `friend_list` DISABLE KEYS */;
INSERT INTO `friend_list` VALUES ('Akash','Amrut'),('Alex','Soniya'),('Amrut','Akash'),('Soniya','Alex'),('Hello','Akash'),('Akash','Hello'),('Akash','Alex'),('Alex','Akash'),('Akash','Ajay'),('Ajay','Akash');
/*!40000 ALTER TABLE `friend_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likecomment`
--

DROP TABLE IF EXISTS `likecomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likecomment` (
  `Username` varchar(45) NOT NULL,
  `CommentID` bigint NOT NULL,
  `Liked` int NOT NULL,
  PRIMARY KEY (`Username`),
  KEY `fk_com_idx` (`CommentID`),
  CONSTRAINT `fk_com` FOREIGN KEY (`CommentID`) REFERENCES `comments` (`CommentID`),
  CONSTRAINT `fk_kkk` FOREIGN KEY (`Username`) REFERENCES `userstable` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likecomment`
--

LOCK TABLES `likecomment` WRITE;
/*!40000 ALTER TABLE `likecomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `likecomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likepost`
--

DROP TABLE IF EXISTS `likepost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likepost` (
  `PostID` bigint NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) NOT NULL,
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  KEY `Fk_poster_idx` (`PostID`),
  CONSTRAINT `Fk_pos` FOREIGN KEY (`PostID`) REFERENCES `posts` (`PostID`),
  CONSTRAINT `Fk_user` FOREIGN KEY (`Username`) REFERENCES `userstable` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likepost`
--

LOCK TABLES `likepost` WRITE;
/*!40000 ALTER TABLE `likepost` DISABLE KEYS */;
INSERT INTO `likepost` VALUES (1,'Ajay');
/*!40000 ALTER TABLE `likepost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pending_request`
--

DROP TABLE IF EXISTS `pending_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pending_request` (
  `Sender` varchar(45) NOT NULL,
  `Reciever` varchar(45) NOT NULL,
  PRIMARY KEY (`Sender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pending_request`
--

LOCK TABLES `pending_request` WRITE;
/*!40000 ALTER TABLE `pending_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `pending_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pending_requests`
--

DROP TABLE IF EXISTS `pending_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pending_requests` (
  `Sender` varchar(45) NOT NULL,
  `Reciever` varchar(45) NOT NULL,
  PRIMARY KEY (`Sender`,`Reciever`),
  KEY `Reciever_ID_idx` (`Reciever`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pending_requests`
--

LOCK TABLES `pending_requests` WRITE;
/*!40000 ALTER TABLE `pending_requests` DISABLE KEYS */;
INSERT INTO `pending_requests` VALUES ('Ajay','Ajay'),('Ajay','Alex'),('Ajay','Soniya');
/*!40000 ALTER TABLE `pending_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `PostID` bigint NOT NULL AUTO_INCREMENT,
  `Caption` longtext NOT NULL,
  `Pic` longblob,
  `UploadedAt` datetime NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Personal` int NOT NULL,
  PRIMARY KEY (`PostID`),
  UNIQUE KEY `PostID_UNIQUE` (`PostID`),
  KEY `FK_For_idx` (`Username`),
  CONSTRAINT `FK_For` FOREIGN KEY (`Username`) REFERENCES `userstable` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'hi',NULL,'2021-12-09 10:32:33','Akash',0),(2,'hi',NULL,'2021-12-09 13:01:53','Ajay',1),(3,'HACKERBOI',_binary 'download.jpg','2021-12-09 13:23:33','Akash',0);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `try`
--

DROP TABLE IF EXISTS `try`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `try` (
  `Sender` varchar(45) NOT NULL,
  `Rec` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `try`
--

LOCK TABLES `try` WRITE;
/*!40000 ALTER TABLE `try` DISABLE KEYS */;
/*!40000 ALTER TABLE `try` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userstable`
--

DROP TABLE IF EXISTS `userstable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userstable` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `midName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `contactNo` int DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `Username_UNIQUE` (`username`),
  UNIQUE KEY `Email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userstable`
--

LOCK TABLES `userstable` WRITE;
/*!40000 ALTER TABLE `userstable` DISABLE KEYS */;
INSERT INTO `userstable` VALUES ('Ajay','Ajay','ajay@gmail.com','Ajay',NULL,NULL,NULL),('Akash','Akash','akash@gmail.com','Akash',NULL,NULL,NULL),('Alex','Alex','Alex@gmail.com','Alex',NULL,NULL,NULL),('Amrut','Amrut','amrut@gmail.com','Amrut',NULL,NULL,NULL),('Batman','Manbat','akash.21911057@viit.ac.in','firstName',NULL,NULL,3432),('CaptainLambda','dfd','asd@gmail.com','QWE','QWE',NULL,1231232312),('CaptainLambdad','ddd','hehe@gmail.com','QWE','QWE',NULL,1231232312),('Hello','Hello','ak.gamingside@gmail.com','Herobrine',NULL,NULL,NULL),('Soniya','Soniya','soniya@gmail.com','Soniya',NULL,NULL,NULL),('wealthfligdht','','wewe@gmail.com','wewe','',NULL,1111111),('wealthflight.in','','aaa@gmail.com','asdasd','',NULL,1231231931),('whan','whan','whan@gmail.com','HHIHIHI','',NULL,1231234444),('Yl','Password','aksgh@gmail.com','YO',NULL,NULL,NULL),('Ynnel','RDR2','R2D2@gmail.com','LENNY',NULL,NULL,NULL),('Yolo','Password','aksh@gmail.com','YO',NULL,NULL,NULL),('Yyl','Password','aksgsh@gmail.com','YfO',NULL,NULL,NULL);
/*!40000 ALTER TABLE `userstable` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_ins_phno` BEFORE INSERT ON `userstable` FOR EACH ROW BEGIN
IF NEW.contactNo < 0 THEN SET NEW.contactNo=NULL;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'social'
--

--
-- Dumping routines for database 'social'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-10 18:59:28
