from django.apps import AppConfig


class StoreBackendConfig(AppConfig):
    name = 'store_backend'

    def ready(self):
        import store_backend.signals
