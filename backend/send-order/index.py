import os
import json
import base64
import urllib.request

TG_MIRRORS = [
    'https://api.telegram.dog',
    'https://api.telegram.org',
    'https://tg.i-c-a.su',
]

def tg_request(token: str, method: str, payload: bytes, content_type: str = 'application/json') -> bool:
    for mirror in TG_MIRRORS:
        try:
            url = f'{mirror}/bot{token}/{method}'
            req = urllib.request.Request(url, data=payload, headers={'Content-Type': content_type})
            with urllib.request.urlopen(req, timeout=8) as resp:
                result = json.loads(resp.read())
                if result.get('ok'):
                    return True
        except Exception:
            continue
    return False

def tg_send_text(token: str, chat_id: str, text: str) -> bool:
    payload = json.dumps({'chat_id': chat_id, 'text': text}).encode()
    return tg_request(token, 'sendMessage', payload)

def tg_send_file(token: str, chat_id: str, file_data: bytes, file_name: str, mime_type: str) -> bool:
    is_video = mime_type.startswith('video/')
    method = 'sendVideo' if is_video else 'sendPhoto'
    field = 'video' if is_video else 'photo'
    boundary = b'----FormBoundary7MA4YWxkTrZu0gW'
    body = (
        b'--' + boundary + b'\r\n'
        b'Content-Disposition: form-data; name="chat_id"\r\n\r\n' +
        chat_id.encode() + b'\r\n--' + boundary + b'\r\n' +
        f'Content-Disposition: form-data; name="{field}"; filename="{file_name}"\r\n'.encode() +
        f'Content-Type: {mime_type}\r\n\r\n'.encode() +
        file_data + b'\r\n--' + boundary + b'--\r\n'
    )
    content_type = f'multipart/form-data; boundary={boundary.decode()}'
    return tg_request(token, method, body, content_type)

def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта kWt24 в Telegram через прокси (текст + фото/видео)."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': '',
        }

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '—')
    phone = body.get('phone', '—')
    power = body.get('power', '—')
    cadastral = body.get('cadastral', '—')
    rosseti = body.get('rosseti', '—')
    comment = body.get('comment', '—')
    attachments = body.get('attachments', [])

    text = (
        f'⚡️ Новая заявка kWt24\n\n'
        f'👤 Имя: {name}\n'
        f'📞 Телефон: {phone}\n'
        f'🔌 Мощность: {power}\n'
        f'🏠 Кадастровый номер: {cadastral}\n'
        f'🖥 Портал Россетей / заявка ранее: {rosseti}\n'
        f'💬 Комментарий: {comment}'
    )

    ok = tg_send_text(token, chat_id, text)
    if not ok:
        return {
            'statusCode': 502,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': False, 'error': 'Не удалось доставить сообщение в Telegram'}),
        }

    for att in attachments:
        try:
            file_data = base64.b64decode(att['data'])
            tg_send_file(token, chat_id, file_data, att['name'], att['type'])
        except Exception:
            continue

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True}),
    }