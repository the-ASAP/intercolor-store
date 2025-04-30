<? require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/header.php'); ?>
<? $APPLICATION->SetTitle("Catalog");
define('VUEJS_DEBUG', true);
\Bitrix\Main\UI\Extension::load('asap.CatalogApp');
?>

<div id="catalog-section"></div>

<script type="text/javascript">
  const CatalogApp = new BX.CatalogApp(
    '#catalog-section', {
      data: 'anyData',
    }
  );
  CatalogApp.init();
</script>

<? require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/footer.php'); ?>
