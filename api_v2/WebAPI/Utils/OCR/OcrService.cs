using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {

        private readonly string _subscriptionKey = "bda38cb1f1f643a2b69e3d8714c7ec10";
        private readonly string _endpoint = "https://computervisionvitalhub.cognitiveservices.azure.com/";

        public async Task <string> RecognizeTextAsync (Stream imageStream)
        {
            try
            {
                //cria um client para API de Computer Vision
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                {
                    Endpoint = _endpoint
                };

                //faz a chamada para a API
                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                //processa o resultado e retorna o texto reconhecido 
                return ProcessRecognitionResult(ocrResult);

            }
            catch (Exception e)
            {

                return "Erro ao reconhecer o texto" + e.Message;
            }
        }

        private static string ProcessRecognitionResult(OcrResult result)
        {

            string recognizedText = "";

            foreach (var region in result.Regions)
            {
                foreach (var line in region.Lines)
                {
                    foreach (var words in line.Words)
                    {
                        recognizedText += words.Text + " ";
                    }

                    recognizedText += "\n";
                }
            }

            return recognizedText;
        }
    }
}
