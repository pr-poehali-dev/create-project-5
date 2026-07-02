import os
import json
import base64
import requests

TG_MIRRORS = [
    'https://api.telegram.dog',
    'https://api.telegram.org',
    'https://tg.i-c-a.su',
]

def tg_request_json(token: str, method: str, data: dict) -> bool:
    for mirror in TG_MIRRORS:
        try:
            url = f'{mirror}/bot{token}/{method}'
            resp = requests.post(url, json=data, timeout=8)
            result = resp.json()
            if result.get('ok'):
                return True
        except Exception:
            continue
    return False

def tg_request_file(token: str, method: str, data: dict, files: dict) -> bool:
    for mirror in TG_MIRRORS:
        try:
            url = f'{mirror}/bot{token}/{method}'
            resp = requests.post(url, data=data, files=files, timeout=20)
            result = resp.json()
            if result.get('ok'):
                return True
        except Exception:
            continue
    return False

def tg_send_text(token: str, chat_id: str, text: str) -> bool:
    return tg_request_json(token, 'sendMessage', {'chat_id': chat_id, 'text': text})

def tg_send_file(token: str, chat_id: str, file_data: bytes, file_name: str, mime_type: str) -> bool:
    is_video = mime_type.startswith('video/')
    method = 'sendVideo' if is_video else 'sendPhoto'
    field = 'video' if is_video else 'photo'
    return tg_request_file(token, method, {'chat_id': chat_id}, {field: (file_name, file_data, mime_type)})

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