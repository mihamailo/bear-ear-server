import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image',
}

@Injectable()

export class FileService {

    createFile(type: FileType, file): string {
        try {
            const fileExtention = file.originalname.split('.').pop();
            const fileName = uuid.v4() + "." + fileExtention;

            const filePath = path.resolve(__dirname, "..", 'static', type);
            console.log(filePath);

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

            return type + '/' + fileName
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    removeFile(finename: string) {

    }
}