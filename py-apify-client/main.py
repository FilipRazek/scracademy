import os
from apify_client import ApifyClient

client = ApifyClient(token=os.environ.get('APIFY_TOKEN'))

actor = client.actor("filip_razek/my-actor")


def update_actor(actor, **kwargs):
    actor.update(**kwargs)


def run_actor(client, actor, num1, num2):
    run = actor.call(run_input={
        'num1': num1,
        'num2': num2})

    dataset = client.dataset(run['defaultDatasetId'])
    return dataset.list_items().items


run_actor(client, actor, 1, 2)
