import {
    GetObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";
import Person from "../datamodel/Person";
import Utils from "../logic/utils";

export default class DataStore {

    public static async getAllBirthdays(): Promise<Array<Person>> {
        const data: Array<any> = await this.getBirthdayFile();

        return data.map((p) => {
            const person: Person = new Person();
            person.id = p.user_id;
            person.firstname = p.first_name;
            person.lastname = p.last_name;
            person.birthday = p.birthday;

            return person;
        });
    }

    public static async getTodayBirthdays(): Promise<Array<Person>> {
        const date: number = Utils.getDate();
        const data: Array<any> = await this.getBirthdayFile();

        return data.filter((p) => {
            if (p && p.first_name && p.last_name && p.birthday) {
                const [pDay, pMonth] = p.birthday.split('.');

                if (+pDay === date && +pMonth === new Date().getMonth() + 1) {
                    return p;
                }
            }
        })
            .map((p) => {
                const person: Person = new Person();
                person.id = p.user_id;
                person.firstname = p.first_name;
                person.lastname = p.last_name;
                person.birthday = p.birthday;

                return person;
            });
    }

    private static async getBirthdayFile(): Promise<Array<any>> {
        const client: S3Client = new S3Client({
            region: 'eu-west-2',
            credentials: fromCognitoIdentityPool({
                clientConfig: {region: "eu-west-2"},
                identityPoolId: "eu-west-2:b20ea6df-30ae-48f4-acbf-3812ed37dc18",
            }),
        });
        const command: GetObjectCommand = new GetObjectCommand({
            Bucket: "cf-birthdaystoragedatasource",
            Key: 'DataSource.json'
        });

        const {Body} = await client.send(command);
        const data = await Body?.transformToString();
        let dataObject = [];

        if (data) {
            dataObject = JSON.parse(data).birthday_source;
        }

        return dataObject;
    }
}