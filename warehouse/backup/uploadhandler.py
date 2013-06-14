import tempfile

from django.conf import settings
from django.core.files.uploadedfile import TemporaryUploadedFile
from django.core.files.uploadhandler import TemporaryFileUploadHandler


class TemporaryUploadedGzipFile(TemporaryUploadedFile):
    def __init__(self, name, content_type, size, charset):
        if settings.FILE_UPLOAD_TEMP_DIR:
            file = tempfile.NamedTemporaryFile(suffix='.json.gz',
                                               dir=settings.FILE_UPLOAD_TEMP_DIR,
                                               delete=False)
        else:
            file = tempfile.NamedTemporaryFile(suffix='.json.gz', delete=False)
        super(TemporaryUploadedFile, self).__init__(file, name, content_type, size, charset)


class TemporaryGzipFileUploadHandler(TemporaryFileUploadHandler):
    def new_file(self, file_name, *args, **kwargs):
        super(TemporaryFileUploadHandler, self).new_file(file_name, *args, **kwargs)
        self.file = TemporaryUploadedGzipFile(self.file_name, self.content_type, 0, self.charset)

