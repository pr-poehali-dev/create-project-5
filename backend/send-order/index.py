import os
import json
import urllib.request

def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта kWt24 в Telegram."""
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
    comment = body.get('comment', '—')

    text = (
        f'⚡️ Новая заявка kWt24\n\n'
        f'👤 Имя: {name}\n'
        f'📞 Телефон: {phone}\n'
        f'🔌 Мощность: {power} кВт\n'
        f'💬 Комментарий: {comment}'
    )

    url = f'https://api.telegram.org/bot{token}/sendMessage'
    payload = json.dumps({'chat_id': chat_id, 'text': text}).encode()
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=10) as resp:
        json.loads(resp.read())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True}),
    }
