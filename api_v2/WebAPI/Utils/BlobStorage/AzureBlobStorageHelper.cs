using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {

        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeContainer)
        {
			try
			{
				if (arquivo != null)
				{
					//gerar um nome unico para a imagem
					var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(arquivo.FileName);

					//cria uma instancia do BlobServiceClient passando a string de conexao com o blob da azure 
					var blobServiceClient = new BlobServiceClient(stringConexao);

					//obtem dados do container client 
					var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeContainer);

					//obtem um blobClient usando o blobname
					var blobClient = blobContainerClient.GetBlobClient(blobName);


					//abre o fluxo de entrada do arquivo (foto)
					using (var stream = arquivo.OpenReadStream())
					{
						await blobClient.UploadAsync(stream, true);
					}

					//retorna a uri do blob como uma string
					return blobClient.Uri.ToString();
				}
				else
				{

					//retorna a uri de uma imagem padrao caso nenhuma image seja enviada na requisicao
					return "https://blobvitalhub08.blob.core.windows.net/blobvitalhubcontainer/pfpstandard.png";

                }
			}
			catch (Exception)
			{

				throw;
			}
        }
    }
}
