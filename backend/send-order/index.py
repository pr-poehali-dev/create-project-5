import os
import json
import urllib.request

TG_MIRRORS = [
    'https://api.telegram.org',
    'https://api.telegram.dog',
]

def tg_send(token: str, chat_id: str, text: str) -> bool:
    """Пробуем отправить через несколько зеркал Telegram API."""
    payload = json.dumps({'chat_id': chat_id, 'text': text}).encode()
    for base in TG_MIRRORS:
        try:
            url = f'{base}/bot{token}/sendMessage'
            req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
            with urllib.request.urlopen(req, timeout=10) as resp:
                result = json.loads(resp.read())
                if result.get('ok'):
                    return True
        except Exception:
            continue
    return False

def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта kWt24 в Telegram через прокси."""
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

    text = (
        f'⚡️ Новая заявка kWt24\n\n'
        f'👤 Имя: {name}\n'
        f'📞 Телефон: {phone}\n'
        f'🔌 Мощность: {power}\n'
        f'🏠 Кадастровый номер: {cadastral}\n'
        f'🖥 Портал Россетей / заявка ранее: {rosseti}\n'
        f'💬 Комментарий: {comment}'
    )

    ok = tg_send(token, chat_id, text)

    if not ok:
        return {
            'statusCode': 502,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'ok': False, 'error': 'Не удалось доставить сообщение в Telegram'}),
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True}),
    }
