using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using MyProject.Service.Responnse_Classes;
using Google.Api.Gax.ResourceNames;
using Google.Cloud.Translate.V3;
using Google.Api.Gax.Grpc.Rest;
using Google.Cloud.Translation.V2;
using static System.Net.Mime.MediaTypeNames;

namespace TextFunctionService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }
        public async Task<string[]> GetKeyWords(string description)
        {
            var client = new HttpClient();

            // Define request payload
            var requestData = new
            {
                text = description,
                language = "en"
            };

            // Serialize request payload to JSON
            var jsonPayload = JsonConvert.SerializeObject(requestData);

            // Define request options
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://gw.cortical.io/nlp/keywords"),
                Content = new StringContent(jsonPayload, System.Text.Encoding.UTF8, "application/json")
            };

            // Add authorization header


            try
            {
                // Send the request and get response
                var response = await client.SendAsync(request);

                // Ensure success status code
                response.EnsureSuccessStatusCode();

                // Read response content
                var responseBody = await response.Content.ReadAsStringAsync();

                // Parse JSON response
                var responseData = JsonConvert.DeserializeObject<KeyWordResult>(responseBody);

                // Sort keywords based on score
                var sortedKeywords = responseData.Keywords.OrderByDescending(k => k.Score);

                // Extract "word" fields into a sorted string array
                var words = sortedKeywords.Select(k => k.Word).ToArray();

                // Output the sorted string array
                Console.WriteLine("Words (Sorted by Score):");
                foreach (var word in words)
                {
                    Console.WriteLine(word);
                }
                return words;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"HTTP Error: {e.Message}");
                return null;
            }
        }
        private async Task<string[]> GetNounsFromServer(string text)
        {
            string baseUrl = "http://127.0.0.1:5000/api/parse_text";
            string url = $"{baseUrl}?text={text}";

            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();


                string responseJson = await response.Content.ReadAsStringAsync();
                dynamic responseData = JsonConvert.DeserializeObject(responseJson);

                // Extract the array of nouns from the response
                string[] nouns = responseData["words"].ToObject<string[]>();

                return nouns;
            }
        }
        public async Task<string[]> GetNouns(string text)
        {
            try
            {
                string[] nouns = await GetNounsFromServer(text);

                return nouns;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return new string[0];
            }
        }
        public async Task<double?> GetSimilarity(string word1, string word2)
        {
            var client = new HttpClient();

            // Define request payload
            var requestData = new List<object>
            {
            new { text = word1, language = "en" },
            new { text = word2, language = "en" }
            };

            // Serialize request payload to JSON
            var jsonPayload = JsonConvert.SerializeObject(requestData);

            // Define request options
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://gw.cortical.io/nlp/compare"),
                Content = new StringContent(jsonPayload, System.Text.Encoding.UTF8, "application/json")
            };

            // Add authorization header


            try
            {
                // Send the request and get response
                var response = await client.SendAsync(request);

                // Ensure success status code
                response.EnsureSuccessStatusCode();

                // Read response content
                var responseBody = await response.Content.ReadAsStringAsync();
                // Parse JSON response
                var responseData = JsonConvert.DeserializeObject<ComparisonResult>(responseBody);
                // Output response data
                Console.WriteLine(responseData);
                // Output similarity field of each item in the response
                return responseData.Similarity;


            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"HTTP Error: {e.Message}");
                return null;
            }

        }
        public async Task<string> TranslateText(string text)
        {
            string apiKey = "";

            // Your target language code, e.g., "en" for English
            string targetLanguage = "en";

            // Your text to translate
            string textToTranslate = text;

            // Create a TranslationClientBuilder
            TranslationClientBuilder builder = new TranslationClientBuilder
            {
                ApiKey = apiKey
            };

            // Build the TranslationClient
            TranslationClient client = await builder.BuildAsync();

            try
            {
                // Perform the translation
                TranslationResult result = await client.TranslateTextAsync(textToTranslate, targetLanguage);

                // Output the translation
                Console.WriteLine($"Original: {textToTranslate}");
                Console.WriteLine($"Translation: {result.TranslatedText}");

                // Update item's name with the translated text
                return result.TranslatedText;
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error translating text: {e.Message}");
            }
            return null;
        }
    }
}
