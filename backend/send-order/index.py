import os
import json
import urllib.request

def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта kWt24 в Telegram и получение chat_id."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    token = os.environ['TELEGRAM_BOT_TOKEN']

    # GET /get-chat-id — узнать chat_id последнего написавшего боту
    if event.get('httpMethod') == 'GET':
        url = f'https://api.telegram.org/bot{token}/getUpdates'
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read())
        updates = data.get('result', [])
        if not updates:
            return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'chat_id': None, 'message': 'Напиши боту любое сообщение в Telegram и повтори запрос'})}
        chat_id = updates[-1]['message']['chat']['id']
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'chat_id': chat_id})}

    # POST — отправить заявку
    body = json.loads(event.get('body') or '{}')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
    if not chat_id:
        return {'statusCode': 500, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'TELEGRAM_CHAT_ID не задан'})}

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
    payload = json.dumps({'chat_id': chat_id, 'text': text, 'parse_mode': 'HTML'}).encode()
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': True})}
