<?php

namespace Api;

use Bitrix\Main\Loader;

class PostAuth  extends \Bitrix\Main\Engine\Controller
{
    protected function getDefaultPreFilters()
    {
        return [];
    }

    public function configureActions()
    {
        return [
            'viewAction' => [
                'prefilters' => [
                    new \Bitrix\Main\Engine\ActionFilter\Csrf(),
                ],
                '-postfilters' => [
                    new \Bitrix\Main\Engine\ActionFilter\Csrf(),
                ],
            ],
        ];
    }


    public function loginAction()
    {
        $user = new \CUser();
        $input = json_decode(file_get_contents('php://input'), true);
        try
        {
            $isLogged = $user->Login($input['login'], $input['password']);
            if (empty($isLogged['ERROR_TYPE']))
            {

                $userID = $user->GetByLogin('asap@asap.ru')->Fetch();
                $userID = $userID['ID'];
                $user->Authorize($userID);
                $result = [
                    'status' => true,
                    'url' => 'https://managers.intercolor.asap-lp.ru',
                ];
            }
            else
            {
                $result = [
                    'status' => false,
                    'message' => 'Ошибка авторизации, неверный логин или пароль'
                ];
            }
        }
        catch (\Exception $e)
        {
            $result = [
                'status' => false,
                'message' => $e->getMessage()
            ];
        }
        return new \Bitrix\Main\Engine\Response\Json($result);
    }
}
