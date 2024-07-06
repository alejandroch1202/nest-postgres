import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Socket;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization.split(' ')[1];
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.messagesService.registerClient(client, payload.sub);
    } catch (error) {
      client.disconnect();
      console.log('declined', client.id);
      return;
    }

    this.wss.emit(
      'clients-updated',
      this.messagesService.getConnectedClients(),
    );
    console.log('connected', this.messagesService.getUserName(client.id));
    console.log({ connected: this.messagesService.getConnectedClients() });
  }

  handleDisconnect(client: Socket) {
    this.messagesService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesService.getConnectedClients(),
    );
    console.log({ disconnected: this.messagesService.getConnectedClients() });
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    // Emit to client
    // client.emit('message-from-server', {
    //   fullName: this.messagesService.getUserName(client.id),
    //   message: payload.message || 'no-message',
    // });

    // Emit to all clients except the sender
    // client.broadcast.emit('message-from-server', {
    //   fullName: this.messagesService.getUserName(client.id),
    //   message: payload.message || 'no-message',
    // });

    // Emit to all clients
    this.wss.emit('message-from-server', {
      fullName: this.messagesService.getUserName(client.id),
      message: payload.message || 'no-message',
    });
  }
}
