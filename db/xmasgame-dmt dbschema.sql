-- phpMyAdmin SQL Dump
-- version 2.10.1
-- http://www.phpmyadmin.net
-- 
-- Host: xxxx
-- Erstellungszeit: 27. Dezember 2013 um 13:48
-- Server Version: 5.5.31
-- PHP-Version: 5.3.27

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Datenbank: `xxxx`
-- 

-- --------------------------------------------------------

-- 
-- Tabellenstruktur für Tabelle `scores`
-- 

CREATE TABLE `scores` (
  `id` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `sid` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `time` int(4) unsigned DEFAULT NULL,
  `score` int(4) unsigned DEFAULT NULL,
  `history` text COLLATE utf8_unicode_ci NOT NULL,
  `ip` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 
-- Daten für Tabelle `scores`
-- 

INSERT INTO `scores` (`id`, `sid`, `name`, `start`, `end`, `time`, `score`, `history`, `ip`) VALUES 
('1', '1', 'PETER KALBERMANN', NULL, NULL, NULL, 110, '', NULL),
('2', '2', 'FRITZ HAEMMERLE', NULL, NULL, NULL, 490, '', NULL),
('3', '3', 'KARIN BENGER', NULL, NULL, NULL, 640, '', NULL),
('4', '4', 'JULIA STREIT', NULL, NULL, NULL, 700, '', NULL),
('5', '5', 'JOSEF SIEGENTHAL', NULL, NULL, NULL, 810, '', NULL),
('6', '6', 'MARCO GYGAX', NULL, NULL, NULL, 220, '', NULL),
('7', '7', 'JASMIN SCHMIED', NULL, NULL, NULL, 500, '', NULL),
('8', '8', 'ERNST BURREN', NULL, NULL, NULL, 980, '', NULL);

-- --------------------------------------------------------
