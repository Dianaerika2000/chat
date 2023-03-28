import 'dart:convert';
import 'package:http/http.dart' as http;

class Services {
  final String _apiKey = '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';
  final String _url = "https://api.openai.com/v1/chat/completions";

  Future<String> sendMessage(String message) async {
    Map<String, dynamic> data = {
      "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "user",
          "content": message,
        }
      ]
    };
    final response = await http.post(
      Uri.parse(_url),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $_apiKey",
      },
      body: jsonEncode(data),
    );
    if (response.statusCode == 200) {
      final jsonResponse = json.decode(utf8.decode(response.bodyBytes));
      return jsonResponse['choices'][0]['message']["content"];
    } else {
      throw Exception('Failed to load response');
    }
  }
}
