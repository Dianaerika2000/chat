import 'package:flutter/material.dart';
import 'package:open_ai_chatbot/services/services.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  HomePageState createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  final _controller = TextEditingController();
  final _chatLog = <ChatMsg>[];
  final _scrollController = ScrollController();
  bool _isLoading = false;

  void _sendMessage() async {
    final message = _controller.text;
    FocusScope.of(context).requestFocus(FocusNode());
    if (message.isEmpty){
      return;
    }
    _controller.clear();
    _isLoading = true;
    setState(() {
      _chatLog.add(ChatMsg(msg: message, myMsg: true));
      _scrollDown();
    });
    final response = await Services().sendMessage(message);
    setState(() {
      _chatLog.add(ChatMsg(msg: response, myMsg: false));
      _scrollDown();
    });
    _isLoading = false;
  }

  void _scrollDown() {
    Future.delayed(const Duration(seconds: 1), () {
      _scrollController.animateTo(
        _scrollController.position.maxScrollExtent,
        duration: const Duration(seconds: 1),
        curve: Curves.fastOutSlowIn,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFFF2F1F8),
        title: const Text('OpenAI Chatbot', style: TextStyle(color: Colors.black),),
      ),
      backgroundColor: const Color(0xFFF2F1F8),
      body: GestureDetector(
        onTap: (){
          FocusScope.of(context).requestFocus(FocusNode());
        },
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                itemCount: _isLoading ? _chatLog.length + 1 : _chatLog.length,
                itemBuilder: (context, index) {
                  
                  if (_isLoading && index ==_chatLog.length){
                    
                    return const Padding(
                      padding:  EdgeInsets.all(32.0),
                      child: Center(child: CircularProgressIndicator()),
                    );
                  }
                  final message = _chatLog[index];
                  if (message.myMsg) {
                    return Padding(
                      padding: const EdgeInsets.fromLTRB(24, 8, 48, 8),
                      child: Container(
                        decoration: const BoxDecoration(
                            gradient: LinearGradient(colors: [
                              Color(0xFF3D3B47),
                              Color(0xFF85809F)
                            ]),
                            borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(2),
                                topRight: Radius.circular(10),
                                bottomRight: Radius.circular(10),
                                bottomLeft: Radius.circular(10))),
                        child: Padding(
                          padding: const EdgeInsets.all(15.0),
                          child: Text(
                            message.msg,
                            style: const TextStyle(
                                color: Colors.white,
                                fontSize: 16,
                                fontWeight: FontWeight.w400),
                          ),
                        ),
                      ),
                    );
                  }
                  return Padding(
                    padding: const EdgeInsets.only(left: 35, right: 24),
                    child: Text(message.msg,
                          style: const TextStyle(
                            height: 1.5,
                              color: Colors.black,
                              fontSize: 16,
                              fontWeight: FontWeight.w400,)),
                  );
                },
              ),
            ),
            TextField(
              controller: _controller,
              onSubmitted: (value){
                _sendMessage();
              },
              decoration: InputDecoration(
                contentPadding: const EdgeInsets.all(20.0),
                hintText: 'Type a message',
                suffixIcon: IconButton(
                  icon: const Icon(Icons.send),
                  color: Colors.blueGrey,
                  onPressed: _sendMessage,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ChatMsg {
  String msg;
  bool myMsg;
  ChatMsg({required this.msg, required this.myMsg});
}
