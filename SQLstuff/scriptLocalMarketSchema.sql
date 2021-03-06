-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema LocalMarket
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema LocalMarket
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LocalMarket` DEFAULT CHARACTER SET latin1 ;
USE `LocalMarket` ;

-- -----------------------------------------------------
-- Table `LocalMarket`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LocalMarket`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `LocalMarket`.`markets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LocalMarket`.`markets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `direction` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `LocalMarket`.`rols`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LocalMarket`.`rols` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `rol_UNIQUE` (`rol` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `LocalMarket`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LocalMarket`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `names` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` INT(10) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `photo` VARCHAR(45) NOT NULL,
  `agree_terms` VARCHAR(45) NULL DEFAULT NULL,
  `agree_data` VARCHAR(45) NULL DEFAULT NULL,
  `rols_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Userscol1_UNIQUE` (`user_name` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  INDEX `fk_Users_rols1_idx` (`rols_id` ASC) ,
  CONSTRAINT `fk_Users_rols1`
    FOREIGN KEY (`rols_id`)
    REFERENCES `LocalMarket`.`rols` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `LocalMarket`.`markets_has_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LocalMarket`.`markets_has_users` (
  `markets_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`markets_id`, `users_id`),
  INDEX `fk_markets_has_users_users1_idx` (`users_id` ASC) ,
  INDEX `fk_markets_has_users_markets1_idx` (`markets_id` ASC) ,
  CONSTRAINT `fk_markets_has_users_markets1`
    FOREIGN KEY (`markets_id`)
    REFERENCES `LocalMarket`.`markets` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_markets_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `LocalMarket`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `LocalMarket`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LocalMarket`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `wayToSell` TINYINT(1) NOT NULL,
  `kilo` INT(6) NULL DEFAULT NULL,
  `unit` INT(6) NULL DEFAULT NULL,
  `discount` TINYINT(3) NULL DEFAULT NULL,
  `image` VARCHAR(50) NULL DEFAULT NULL,
  `users_id` INT NOT NULL,
  `categories_id` INT NOT NULL,
  `markets_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_users1_idx` (`users_id` ASC) ,
  INDEX `fk_products_categories1_idx1` (`categories_id` ASC) ,
  INDEX `fk_products_markets1_idx1` (`markets_id` ASC) ,
  CONSTRAINT `fk_products_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `LocalMarket`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `LocalMarket`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_markets1`
    FOREIGN KEY (`markets_id`)
    REFERENCES `LocalMarket`.`markets` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

