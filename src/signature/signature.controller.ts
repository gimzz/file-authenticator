import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignatureService } from './signature.service';
import { SignPdfDto } from '../dto/sign-pdf.dto';
import { VerifyPdfDto } from '../dto/verify-pdf.dto';
import { HttpResponse } from 'src/utils/HttpResponse';

@Controller('signature')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @Post('sign/file')
  @UseInterceptors(FileInterceptor('file'))
  signFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return HttpResponse({
        status: 400,
        type: 'warning',
        data: 'PDF_REQUERIDO',
      });
    }

    const result = this.signatureService.signFile(file.buffer);

    return HttpResponse({
      status: 200,
      type: 'success',
      data: result,
    });
  }

  @Post('sign/base64')
  signBase64(@Body() body: SignPdfDto) {
    console.log('Body recibido:', body);
    if (!body || !body.pdfBase64) {
      return HttpResponse({
        status: 400,
        type: 'warning',
        data: 'PDF_BASE64_REQUERIDO',
      });
    }

    let pdfBuffer: Buffer;
    try {
      pdfBuffer = Buffer.from(body.pdfBase64, 'base64');
    } catch {
      return HttpResponse({
        status: 400,
        type: 'danger',
        data: 'PDF_BASE64_INVALIDO',
      });
    }

    const result = this.signatureService.signFile(pdfBuffer);

    return HttpResponse({
      status: 200,
      type: 'success',
      data: result,
    });
  }

  @Post('verify')
  @UseInterceptors(FileInterceptor('file'))
  async verify(@UploadedFile() file: Express.Multer.File) {
    let pdfBuffer: Buffer;
    if (file) {
      pdfBuffer = file.buffer;
    } else {
      return HttpResponse({
        status: 400,
        data: 'PDF_REQUERIDO',
      });
    }

    const valid = await this.signatureService.verifyFile(pdfBuffer);

    return HttpResponse({
      status: 200,
      type: valid ? 'success' : 'danger',
      data: { valid },
    });
  }
}
