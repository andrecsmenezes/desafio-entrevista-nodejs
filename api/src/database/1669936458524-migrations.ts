import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1669936458524 implements MigrationInterface {
    name = 'migrations1669936458524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`complement\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`neighborhood\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`zipCode\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`establishments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cnpj\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`carVacancies\` int NOT NULL, \`motorcycleVacancies\` int NOT NULL, \`addressId\` int NULL, UNIQUE INDEX \`REL_06edbd9c4ab6f29aaa067f0499\` (\`addressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`board\` varchar(255) NOT NULL, \`brand\` int NOT NULL, \`color\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`type\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`establishments\` ADD CONSTRAINT \`FK_06edbd9c4ab6f29aaa067f04993\` FOREIGN KEY (\`addressId\`) REFERENCES \`addresses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`establishments\` DROP FOREIGN KEY \`FK_06edbd9c4ab6f29aaa067f04993\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP INDEX \`REL_06edbd9c4ab6f29aaa067f0499\` ON \`establishments\``);
        await queryRunner.query(`DROP TABLE \`establishments\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
    }

}
