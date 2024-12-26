from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
# Create your tests here.


class TestUser(TestCase):
    def test_register_user(self):
        res = self.client.post(reverse("register"), {"username": "abc", "password": "cde"})
        assert res.status_code == 201
        user = User.objects.get_by_natural_key("abc")
        assert user.check_password("cde")
