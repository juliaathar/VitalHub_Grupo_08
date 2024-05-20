﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Utils.OCR;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OcrController : ControllerBase
    {
        private readonly OcrService _ocrService;
        public OcrController(OcrService ocrService) 
        {
            _ocrService = ocrService;
        }

        [HttpPost]
        public async Task<IActionResult> RecognizeText([FromForm]FileUploadModel fileUploadModel)
        {
            try
            {
                if (fileUploadModel == null || fileUploadModel.Image == null)
                {
                    return BadRequest("Nenhuma imagem foi reconhecida");
                }

                using (var stream = fileUploadModel.Image.OpenReadStream())
                {
                   var result = await _ocrService.RecognizeTextAsync(stream);

                    return Ok(result);
                }
            }
            catch (Exception e )
            {

                return BadRequest($"Erro ao processar a imagem {e.Message}");
            }
        }
    }
}
