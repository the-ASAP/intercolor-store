<?php

namespace Sprint\Migration;

use \Bitrix\Main\Loader;

Loader::includeModule('iblock');

class CreateCatalogDummies20250410013731 extends Version
{
    protected $author = "asap@asap.ru";

    protected $description = "";

    protected $moduleVersion = "5.0.0";
    public function up()
    {

        $iblockType = 'catalog';
        $iblockCode = 'service_shop_catalog';
        $iblockName = 'Каталог товаров для автосервиса';

        $iblockId = $this->createIblock($iblockType, $iblockCode, $iblockName);
        // $helper = $this->getHelperManager();
        // $iblockId = $helper->Iblock()->getIblockIdIfExists('catalog');
        
        $this->createProperty($iblockId, 'SKU', 'Артикул', 'S');
        $this->createProperty($iblockId, 'UNIT', 'Единица измерения', 'S');

        $jsonPath = __DIR__ . '/dummy.json';
        $data = json_decode(file_get_contents($jsonPath), true);

        $sectionMap = [];

        foreach ($data['ServiceShopCatalog'] as $category => $content)
        {
            $sectionId = $this->createSection($iblockId, $category);
            $sectionMap[$category] = $sectionId;

            foreach ($content['Items'] as $item)
            {
                $this->createElement($iblockId, $item, $sectionId);
            }

            foreach ($content['Subcategories'] as $subcategory => $items)
            {
                $subSectionId = $this->createSection($iblockId, $subcategory, $sectionId);
                foreach ($items as $item)
                {
                    $this->createElement($iblockId, $item, $subSectionId);
                }
            }
        }
    }

    private function createIblock($type, $code, $name)
    {
        $res = \CIBlock::GetList([], ['CODE' => $code])->Fetch();
        if ($res) return $res['ID'];

        $ib = new \CIBlock;
        return $ib->Add([
            'IBLOCK_TYPE_ID' => $type,
            'SITE_ID' => ['s1','s2'],
            'NAME' => $name,
            'CODE' => $code,
            'VERSION' => 2,
            'ACTIVE' => 'Y'
        ]);
    }

    private function createProperty($iblockId, $code, $name, $type)
    {
        $prop = new \CIBlockProperty();
        $prop->Add([
            'IBLOCK_ID' => $iblockId,
            'NAME' => $name,
            'ACTIVE' => 'Y',
            'SORT' => 100,
            'CODE' => $code,
            'PROPERTY_TYPE' => $type
        ]);
    }

    private function createSection($iblockId, $name, $parentId = false)
    {
        $section = new \CIBlockSection;
        return $section->Add([
            'IBLOCK_ID' => $iblockId,
            'NAME' => $name,
            'IBLOCK_SECTION_ID' => $parentId ?: null,
            'ACTIVE' => 'Y'
        ]);
    }

    private function createElement($iblockId, $item, $sectionId)
    {
        $el = new \CIBlockElement;

        $elemsId = $el->Add([
            'IBLOCK_ID' => $iblockId,
            'NAME' => $item['name'],
            'ACTIVE' => 'Y',
            'IBLOCK_SECTION_ID' => $sectionId,
            'PREVIEW_TEXT'=> '
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis est, fringilla pulvinar condimentum in, vulputate vitae lectus. Curabitur vitae mattis sem. Suspendisse maximus quis metus in ornare. Etiam at risus non erat malesuada faucibus. Ut ultrices metus fermentum mauris hendrerit faucibus. Nunc in ornare risus, a posuere quam. Phasellus ultricies nisi elit, in pretium velit malesuada eu. Quisque pulvinar lorem vel diam scelerisque, at dictum lectus cursus. Ut lobortis lorem id fermentum maximus. Aenean ultrices est neque, in aliquam sapien molestie elementum. Phasellus consequat convallis neque, eget fermentum diam interdum in.',
             'PREVIEW_TEXT_TYPE'=>'text',
             'DETAIL_TEXT'=> '
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis est, fringilla pulvinar condimentum in, vulputate vitae lectus. Curabitur vitae mattis sem. Suspendisse maximus quis metus in ornare. Etiam at risus non erat malesuada faucibus. Ut ultrices metus fermentum mauris hendrerit faucibus. Nunc in ornare risus, a posuere quam. Phasellus ultricies nisi elit, in pretium velit malesuada eu. Quisque pulvinar lorem vel diam scelerisque, at dictum lectus cursus. Ut lobortis lorem id fermentum maximus. Aenean ultrices est neque, in aliquam sapien molestie elementum. Phasellus consequat convallis neque, eget fermentum diam interdum in.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris felis est, fringilla pulvinar condimentum in, vulputate vitae lectus. Curabitur vitae mattis sem. Suspendisse maximus quis metus in ornare. Etiam at risus non erat malesuada faucibus. Ut ultrices metus fermentum mauris hendrerit faucibus. Nunc in ornare risus, a posuere quam. Phasellus ultricies nisi elit, in pretium velit malesuada eu. Quisque pulvinar lorem vel diam scelerisque, at dictum lectus cursus. Ut lobortis lorem id fermentum maximus. Aenean ultrices est neque, in aliquam sapien molestie elementum. Phasellus consequat convallis neque, eget fermentum diam interdum in.',
            'PROPERTY_VALUES' => [
                'SKU' => $item['sku'],
                'UNIT' => $item['unit']
            ]
        ]);

        $productID = \Bitrix\Catalog\Model\Product::add(
            [
                'ID' => $elemsId,
                'AVAILABLE' => 'Y',
                'TYPE' => \Bitrix\Catalog\ProductTable::TYPE_PRODUCT,
                'QUANTITY' => rand(0,100),
            ]
        );
        \CPrice::add(
            [
                'PRODUCT_ID' => $productID,
                'PRICE' => $item['price'],
                'CURRENCY' => 'RUB',
                'CATALOG_GROUP_ID' => 1,
            ]
        );
    }

    public function down()
    {
    }
}


